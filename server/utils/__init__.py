"""
Utils package for medical query application
"""

from .security import SecurityUtils, token_required, admin_required
from .auth_guard import (
    AuthGuard, UserRole, Permission,
    require_permission, require_any_permission, require_all_permissions,
    require_role, require_ownership_or_admin, is_owner_or_admin
)
from .tagging import MedicalTagger, tag_medical_text
from .logger import (
    MedicalLogger, logger, debug, info, warning, error, critical,
    audit, log_api_access, log_authentication, log_data_access,
    log_medical_query, LoggingMiddleware
)

__all__ = [
    # Security
    'SecurityUtils', 'token_required', 'admin_required',
    
    # Auth Guard
    'AuthGuard', 'UserRole', 'Permission',
    'require_permission', 'require_any_permission', 'require_all_permissions',
    'require_role', 'require_ownership_or_admin', 'is_owner_or_admin',
    
    # Tagging
    'MedicalTagger', 'tag_medical_text',
    
    # Logger
    'MedicalLogger', 'logger', 'debug', 'info', 'warning', 'error', 'critical',
    'audit', 'log_api_access', 'log_authentication', 'log_data_access',
    'log_medical_query', 'LoggingMiddleware'
]