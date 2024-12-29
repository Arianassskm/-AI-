import { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2, Info } from 'lucide-react';
import { MultiPhotoCapture } from './camera/MultiPhotoCapture';
import { useOCR } from '../hooks/useOCR';
import { validateImage } from '../utils/validation';

// ... rest of the file remains the same