"""
Logging utilities for the medical query application
"""
import logging
import os
import json
from datetime import datetime
from typing import Optional, Dict, Any
from logging.handlers import RotatingFileHandler, TimedRotatingFileHandler
import sys
from pathlib import Path

class MedicalLogger:
    """Custom logger for medical application with structured logging"""
    
    def __init__(self, name: str = 'medquery', log_level: str = 'INFO'):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(getattr(logging, log_level.upper()))
        
        # Prevent duplicate handlers
        if not self.logger.handlers:
            self._setup_handlers()
    
    def _setup_handlers(self):
        """Setup logging handlers"""
        # Create logs directory if it doesn't exist
        log_dir = Path('logs')
        log_dir.mkdir(exist_ok=True)
        
        # Console handler with color formatting
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(logging.INFO)
        console_formatter = ColoredFormatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        console_handler.setFormatter(console_formatter)
        
        # File handler for general logs (rotating by size)
        file_handler = RotatingFileHandler(
            log_dir / 'medquery.log',
            maxBytes=10*1024*1024,  # 10MB
            backupCount=5
        )
        file_handler.setLevel(logging.DEBUG)
        file_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        file_handler.setFormatter(file_formatter)
        
        # Error file handler (rotating daily)
        error_handler = TimedRotatingFileHandler(
            log_dir / 'errors.log',
            when='midnight',
            interval=1,
            backupCount=30
        )
        error_handler.setLevel(logging.ERROR)
        error_handler.setFormatter(file_formatter)
        
        # Audit log handler for security events
        audit_handler = TimedRotatingFileHandler(
            log_dir / 'audit.log',
            when='midnight',
            interval=1,
            backupCount=90  # Keep audit logs for 90 days
        )
        audit_handler.setLevel(logging.INFO)
        audit_formatter = JsonFormatter()
        audit_handler.setFormatter(audit_formatter)
        
        # Add handlers to logger
        self.logger.addHandler(console_handler)
        self.logger.addHandler(file_handler)
        self.logger.addHandler(error_handler)
        
        # Separate audit logger
        self.audit_logger = logging.getLogger(f'{self.logger.name}.audit')
        self.audit_logger.addHandler(audit_handler)
        self.audit_logger.setLevel(logging.INFO)
        self.audit_logger.propagate = False
    
    def debug(self, message: str, **kwargs):
        """Log debug message"""
        self.logger.debug(self._format_message(message, **kwargs))
    
    def info(self, message: str, **kwargs):
        """Log info message"""
        self.logger.info(self._format_message(message, **kwargs))
    
    def warning(self, message: str, **kwargs):
        """Log warning message"""
        self.logger.warning(self._format_message(message, **kwargs))
    
    def error(self, message: str, error: Optional[Exception] = None, **kwargs):
        """Log error message"""
        if error:
            self.logger.error(
                self._format_message(message, error=str(error), **kwargs),
                exc_info=True
            )
        else:
            self.logger.error(self._format_message(message, **kwargs))
    
    def critical(self, message: str, **kwargs):
        """Log critical message"""
        self.logger.critical(self._format_message(message, **kwargs))
    
    def audit(self, event: str, user_id: Optional[str] = None, 
              ip_address: Optional[str] = None, **kwargs):
        """Log audit event"""
        audit_data = {
            'timestamp': datetime.utcnow().isoformat(),
            'event': event,
            'user_id': user_id,
            'ip_address': ip_address,
            **kwargs
        }
        self.audit_logger.info(json.dumps(audit_data))
    
    def log_api_access(self, method: str, endpoint: str, user_id: Optional[str] = None,
                      ip_address: Optional[str] = None, status_code: Optional[int] = None,
                      response_time: Optional[float] = None):
        """Log API access"""
        self.audit(
            'api_access',
            user_id=user_id,
            ip_address=ip_address,
            method=method,
            endpoint=endpoint,
            status_code=status_code,
            response_time=response_time
        )
    
    def log_authentication(self, event: str, user_id: Optional[str] = None,
                          ip_address: Optional[str] = None, success: bool = True):
        """Log authentication events"""
        self.audit(
            f'auth_{event}',
            user_id=user_id,
            ip_address=ip_address,
            success=success
        )
    
    def log_data_access(self, action: str, resource: str, user_id: Optional[str] = None,
                       resource_id: Optional[str] = None):
        """Log data access events"""
        self.audit(
            'data_access',
            user_id=user_id,
            action=action,
            resource=resource,
            resource_id=resource_id
        )
    
    def log_medical_query(self, query: str, user_id: Optional[str] = None,
                         response_type: Optional[str] = None,
                         processing_time: Optional[float] = None):
        """Log medical query events"""
        self.audit(
            'medical_query',
            user_id=user_id,
            query_length=len(query),
            response_type=response_type,
            processing_time=processing_time
        )
    
    def _format_message(self, message: str, **kwargs) -> str:
        """Format log message with additional context"""
        if kwargs:
            context = " | ".join([f"{k}={v}" for k, v in kwargs.items()])
            return f"{message} | {context}"
        return message


class ColoredFormatter(logging.Formatter):
    """Colored formatter for console output"""
    
    COLORS = {
        'DEBUG': '\033[36m',    # Cyan
        'INFO': '\033[32m',     # Green
        'WARNING': '\033[33m',  # Yellow
        'ERROR': '\033[31m',    # Red
        'CRITICAL': '\033[35m', # Magenta
        'RESET': '\033[0m'      # Reset
    }
    
    def format(self, record):
        log_color = self.COLORS.get(record.levelname, self.COLORS['RESET'])
        record.levelname = f"{log_color}{record.levelname}{self.COLORS['RESET']}"
        return super().format(record)


class JsonFormatter(logging.Formatter):
    """JSON formatter for structured logging"""
    
    def format(self, record):
        log_entry = {
            'timestamp': datetime.utcnow().isoformat(),
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
            'module': record.module,
            'function': record.funcName,
            'line': record.lineno
        }
        
        if record.exc_info:
            log_entry['exception'] = self.formatException(record.exc_info)
        
        return json.dumps(log_entry)


# Global logger instance
logger = MedicalLogger()

# Convenience functions
def debug(message: str, **kwargs):
    """Log debug message"""
    logger.debug(message, **kwargs)

def info(message: str, **kwargs):
    """Log info message"""
    logger.info(message, **kwargs)

def warning(message: str, **kwargs):
    """Log warning message"""
    logger.warning(message, **kwargs)

def error(message: str, error: Optional[Exception] = None, **kwargs):
    """Log error message"""
    logger.error(message, error=error, **kwargs)

def critical(message: str, **kwargs):
    """Log critical message"""
    logger.critical(message, **kwargs)

def audit(event: str, **kwargs):
    """Log audit event"""
    logger.audit(event, **kwargs)

def log_api_access(method: str, endpoint: str, **kwargs):
    """Log API access"""
    logger.log_api_access(method, endpoint, **kwargs)

def log_authentication(event: str, **kwargs):
    """Log authentication event"""
    logger.log_authentication(event, **kwargs)

def log_data_access(action: str, resource: str, **kwargs):
    """Log data access event"""
    logger.log_data_access(action, resource, **kwargs)

def log_medical_query(query: str, **kwargs):
    """Log medical query event"""
    logger.log_medical_query(query, **kwargs)

# Request/Response logging middleware
class LoggingMiddleware:
    """Middleware for logging HTTP requests and responses"""
    
    def __init__(self, app):
        self.app = app
    
    def __call__(self, environ, start_response):
        from flask import request, g
        import time
        
        start_time = time.time()
        
        def new_start_response(status, response_headers, exc_info=None):
            g.status_code = int(status.split()[0])
            return start_response(status, response_headers, exc_info)
        
        try:
            response = self.app(environ, new_start_response)
            
            # Log the request
            processing_time = time.time() - start_time
            log_api_access(
                method=environ.get('REQUEST_METHOD'),
                endpoint=environ.get('PATH_INFO'),
                ip_address=environ.get('REMOTE_ADDR'),
                status_code=getattr(g, 'status_code', None),
                response_time=processing_time
            )
            
            return response
            
        except Exception as e:
            error(f"Request processing failed: {str(e)}", error=e)
            raise