"""
NLP tagging utilities for medical text processing
"""
import re
import spacy
from typing import List, Dict, Set, Tuple, Optional
from collections import defaultdict
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem import WordNetLemmatizer

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')

class MedicalTagger:
    """NLP tagger for medical text processing"""
    
    def __init__(self):
        """Initialize the medical tagger"""
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        
        # Try to load spaCy model
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except OSError:
            print("Warning: spaCy English model not found. Install with: python -m spacy download en_core_web_sm")
            self.nlp = None
        
        # Medical terminology patterns
        self.medical_patterns = {
            'symptoms': [
                r'\b(?:pain|ache|fever|nausea|vomiting|headache|dizziness|fatigue|weakness)\b',
                r'\b(?:shortness of breath|chest pain|abdominal pain|back pain)\b',
                r'\b(?:cough|sore throat|runny nose|congestion)\b'
            ],
            'conditions': [
                r'\b(?:diabetes|hypertension|asthma|pneumonia|bronchitis|infection)\b',
                r'\b(?:heart disease|stroke|cancer|tumor|arthritis|depression)\b',
                r'\b(?:covid|flu|influenza|cold|allergies)\b'
            ],
            'medications': [
                r'\b(?:aspirin|ibuprofen|acetaminophen|amoxicillin|penicillin)\b',
                r'\b(?:insulin|metformin|lisinopril|atorvastatin|prednisone)\b',
                r'\b(?:mg|ml|tablet|capsule|injection|dose|dosage)\b'
            ],
            'body_parts': [
                r'\b(?:head|neck|chest|abdomen|back|arm|leg|hand|foot)\b',
                r'\b(?:heart|lung|liver|kidney|brain|stomach|intestine)\b',
                r'\b(?:blood|bone|muscle|skin|nerve|vessel)\b'
            ],
            'procedures': [
                r'\b(?:surgery|operation|x-ray|mri|ct scan|ultrasound)\b',
                r'\b(?:blood test|urine test|biopsy|colonoscopy|endoscopy)\b',
                r'\b(?:vaccination|injection|treatment|therapy)\b'
            ]
        }
        
        # Compile patterns for efficiency
        self.compiled_patterns = {}
        for category, patterns in self.medical_patterns.items():
            self.compiled_patterns[category] = [
                re.compile(pattern, re.IGNORECASE) for pattern in patterns
            ]
    
    def extract_medical_entities(self, text: str) -> Dict[str, List[str]]:
        """Extract medical entities from text using pattern matching"""
        entities = defaultdict(list)
        
        for category, patterns in self.compiled_patterns.items():
            for pattern in patterns:
                matches = pattern.findall(text)
                entities[category].extend(matches)
        
        # Remove duplicates and convert to lowercase
        for category in entities:
            entities[category] = list(set([match.lower() for match in entities[category]]))
        
        return dict(entities)
    
    def extract_named_entities(self, text: str) -> List[Dict[str, str]]:
        """Extract named entities using spaCy if available"""
        if not self.nlp:
            return []
        
        doc = self.nlp(text)
        entities = []
        
        for ent in doc.ents:
            entities.append({
                'text': ent.text,
                'label': ent.label_,
                'description': spacy.explain(ent.label_),
                'start': ent.start_char,
                'end': ent.end_char
            })
        
        return entities
    
    def extract_keywords(self, text: str, max_keywords: int = 10) -> List[str]:
        """Extract keywords from medical text"""
        # Convert to lowercase and tokenize
        tokens = word_tokenize(text.lower())
        
        # Remove stop words and non-alphabetic tokens
        filtered_tokens = [
            self.lemmatizer.lemmatize(token) 
            for token in tokens 
            if token.isalpha() and token not in self.stop_words and len(token) > 2
        ]
        
        # Count frequency
        word_freq = defaultdict(int)
        for token in filtered_tokens:
            word_freq[token] += 1
        
        # Sort by frequency and return top keywords
        sorted_keywords = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
        return [keyword for keyword, freq in sorted_keywords[:max_keywords]]
    
    def extract_medical_abbreviations(self, text: str) -> List[str]:
        """Extract medical abbreviations from text"""
        # Pattern for common medical abbreviations (2-5 uppercase letters)
        abbreviation_pattern = r'\b[A-Z]{2,5}\b'
        abbreviations = re.findall(abbreviation_pattern, text)
        return list(set(abbreviations))
    
    def extract_dosage_information(self, text: str) -> List[Dict[str, str]]:
        """Extract medication dosage information"""
        dosage_patterns = [
            r'(\d+(?:\.\d+)?)\s*(mg|ml|g|mcg|units?)\b',
            r'(\d+)\s*(tablets?|capsules?|pills?)\b',
            r'(\d+)\s*times?\s*(?:per\s+)?(?:day|daily|week|month)\b'
        ]
        
        dosages = []
        for pattern in dosage_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                dosages.append({
                    'text': match.group(0),
                    'value': match.group(1),
                    'unit': match.group(2) if len(match.groups()) > 1 else '',
                    'start': match.start(),
                    'end': match.end()
                })
        
        return dosages
    
    def extract_vital_signs(self, text: str) -> Dict[str, List[str]]:
        """Extract vital signs from medical text"""
        vital_patterns = {
            'blood_pressure': r'\b(\d{2,3})/(\d{2,3})\s*(?:mmHg|mm\s*Hg)?\b',
            'heart_rate': r'\b(\d{2,3})\s*(?:bpm|beats?\s*per\s*minute)\b',
            'temperature': r'\b(\d{2,3}(?:\.\d)?)\s*(?:°F|°C|degrees?)\b',
            'respiratory_rate': r'\b(\d{1,2})\s*(?:breaths?\s*per\s*minute|rpm)\b',
            'oxygen_saturation': r'\b(\d{2,3})%?\s*(?:O2|oxygen\s*saturation|SpO2)\b'
        }
        
        vitals = {}
        for vital_type, pattern in vital_patterns.items():
            matches = re.findall(pattern, text, re.IGNORECASE)
            vitals[vital_type] = [match if isinstance(match, str) else '/'.join(match) for match in matches]
        
        return vitals
    
    def tag_medical_text(self, text: str) -> Dict[str, any]:
        """Comprehensive medical text tagging"""
        result = {
            'original_text': text,
            'medical_entities': self.extract_medical_entities(text),
            'keywords': self.extract_keywords(text),
            'abbreviations': self.extract_medical_abbreviations(text),
            'dosages': self.extract_dosage_information(text),
            'vital_signs': self.extract_vital_signs(text),
            'sentence_count': len(sent_tokenize(text)),
            'word_count': len(word_tokenize(text))
        }
        
        # Add named entities if spaCy is available
        if self.nlp:
            result['named_entities'] = self.extract_named_entities(text)
        
        return result
    
    def categorize_medical_query(self, query: str) -> str:
        """Categorize a medical query based on its content"""
        query_lower = query.lower()
        
        categories = {
            'symptom_query': ['symptom', 'feel', 'pain', 'hurt', 'ache', 'sick'],
            'medication_query': ['medication', 'drug', 'pill', 'medicine', 'treatment'],
            'diagnosis_query': ['diagnosis', 'condition', 'disease', 'disorder'],
            'procedure_query': ['procedure', 'surgery', 'test', 'scan', 'x-ray'],
            'general_health': ['health', 'wellness', 'prevention', 'diet', 'exercise']
        }
        
        for category, keywords in categories.items():
            if any(keyword in query_lower for keyword in keywords):
                return category
        
        return 'general_query'
    
    def extract_medical_numbers(self, text: str) -> List[Dict[str, any]]:
        """Extract medical numbers and measurements"""
        number_patterns = [
            (r'\b(\d+(?:\.\d+)?)\s*(mg|ml|g|mcg|units?|tablets?)\b', 'dosage'),
            (r'\b(\d{2,3})/(\d{2,3})\b', 'blood_pressure'),
            (r'\b(\d+(?:\.\d+)?)\s*(?:°F|°C)\b', 'temperature'),
            (r'\b(\d+)\s*(?:years?\s*old|yo)\b', 'age'),
            (r'\b(\d+(?:\.\d+)?)\s*(?:kg|lb|pounds?)\b', 'weight'),
            (r'\b(\d+(?:\.\d+)?)\s*(?:cm|ft|feet|inches?)\b', 'height')
        ]
        
        numbers = []
        for pattern, number_type in number_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                numbers.append({
                    'text': match.group(0),
                    'type': number_type,
                    'value': match.groups(),
                    'start': match.start(),
                    'end': match.end()
                })
        
        return numbers

# Convenience function for quick tagging
def tag_medical_text(text: str) -> Dict[str, any]:
    """Quick function to tag medical text"""
    tagger = MedicalTagger()
    return tagger.tag_medical_text(text)