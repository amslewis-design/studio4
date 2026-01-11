'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cloudinaryService } from '@/lib/services/cloudinaryService';
import { Asset } from '@/lib/types';

interface ImageUploadManagerProps {
  onAssetUpload: (asset: Asset) => void;
  folderContext?: string;
}

export default function ImageUploadManager({ onAssetUpload, folderContext }: ImageUploadManagerProps) {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!cloudinaryService.isConfigured()) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-700 rounded text-red-400 text-xs uppercase tracking-widest">
        ⚠ Cloudinary not configured. Check environment variables.
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedFormats.includes(fileExtension)) {
      setErrorMessage(`Invalid file format. Allowed: ${allowedFormats.join(', ')}`);
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10000000) {
      setErrorMessage('File size exceeds 10MB limit');
      return;
    }

    setErrorMessage('');
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a file first');
      return;
    }

    setUploadProgress(10);
    setErrorMessage('');

    try {
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const cloudName = cloudinaryService.getCloudName();
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

      if (!uploadPreset || !cloudName || !apiKey) {
        throw new Error('Cloudinary configuration incomplete');
      }

      console.log('[ImageUploadManager] Getting upload signature from server...');
      
      // Get signature from server (required for signed uploads)
      const signatureResponse = await fetch('/api/cloudinary/signature');
      if (!signatureResponse.ok) {
        throw new Error('Failed to get upload signature');
      }

      const { signature, timestamp, folder } = await signatureResponse.json();
      console.log('[ImageUploadManager] Signature obtained:', { timestamp, folder });

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', uploadPreset);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp.toString());
      formData.append('api_key', apiKey);
      formData.append('folder', folder); // Use folder from server response

      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      
      console.log('[ImageUploadManager] Upload configuration:', {
        uploadUrl,
        cloudName,
        uploadPreset,
        folder: folderContext || 'sassy-studio',
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
        hasSignature: !!signature,
        hasTimestamp: !!timestamp,
      });

      setUploadProgress(20);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          const progress = Math.min(80, Math.round(20 + percentComplete * 0.6));
          setUploadProgress(progress);
          console.log('[ImageUploadManager] Upload progress:', progress + '%');
        }
      });

      xhr.addEventListener('load', () => {
        try {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log('[ImageUploadManager] Upload successful:', response);

            setUploadProgress(100);

            const newAsset: Asset = {
              id: response.public_id,
              name: selectedFile.name,
              url: response.secure_url,
              type: 'image',
              createdAt: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }),
              cloudinaryId: response.public_id,
              cloudinaryVersion: response.version,
              folderId: folderContext,
            };

            setTimeout(() => {
              onAssetUpload(newAsset);
              setUploadProgress(null);
              setSelectedFile(null);
              setErrorMessage('');
              // Reset file input
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }, 800);
          } else {
            // Handle non-200 responses (e.g., 400, 401, 500)
            let errorMsg = `Upload failed with status ${xhr.status}`;
            
            try {
              const errorResponse = JSON.parse(xhr.responseText);
              console.error('[ImageUploadManager] Cloudinary error response:', errorResponse);
              
              if (errorResponse.error?.message) {
                errorMsg = `Cloudinary error: ${errorResponse.error.message}`;
              } else if (errorResponse.message) {
                errorMsg = `Error: ${errorResponse.message}`;
              }
            } catch (e) {
              console.error('[ImageUploadManager] Raw response:', xhr.responseText);
            }

            console.error('[ImageUploadManager] Upload failed:', {
              status: xhr.status,
              statusText: xhr.statusText,
              errorMsg,
              uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
              cloudName: cloudinaryService.getCloudName(),
            });

            setErrorMessage(errorMsg);
            setUploadProgress(null);
          }
        } catch (error) {
          console.error('[ImageUploadManager] Error in load event handler:', error);
          setErrorMessage('Unexpected error during upload. Please try again.');
          setUploadProgress(null);
        }
      });

      xhr.addEventListener('error', () => {
        console.error('[ImageUploadManager] Upload request error');
        setErrorMessage('Network error during upload. Please check your connection.');
        setUploadProgress(null);
      });

      xhr.addEventListener('abort', () => {
        console.log('[ImageUploadManager] Upload aborted');
        setErrorMessage('Upload was cancelled');
        setUploadProgress(null);
      });

      console.log('[ImageUploadManager] Starting POST request to:', uploadUrl);

      xhr.open('POST', uploadUrl, true);
      xhr.send(formData);
    } catch (error) {
      console.error('[ImageUploadManager] Upload error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Upload failed. Please try again.';
      setErrorMessage(errorMsg);
      setUploadProgress(null);
    }
  };

  const isUploading = uploadProgress !== null;

  return (
    <div className="space-y-6">
      {/* File Input */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
          Select Image
        </label>
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
            onChange={handleFileChange}
            disabled={isUploading}
            className="w-full bg-black/40 border border-white/10 p-4 text-sm outline-none focus:border-[var(--accent)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-[var(--accent)] file:text-white file:cursor-pointer hover:file:opacity-80"
          />
        </div>
        {selectedFile && (
          <p className="text-xs text-gray-500">
            Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      {/* Progress Bar */}
      {uploadProgress !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
              Upload Progress
            </label>
            <span className="text-xs text-gray-500">{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 bg-black/40 border border-white/10 overflow-hidden rounded-sm">
            <motion.div
              initial={{ width: '10%' }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/80"
            />
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-900/20 border border-red-700/50 rounded text-red-400 text-xs"
        >
          {errorMessage}
        </motion.div>
      )}

      {/* Upload Button */}
      <motion.button
        whileHover={{ opacity: !isUploading ? 0.9 : 1 }}
        whileTap={{ scale: !isUploading ? 0.98 : 1 }}
        onClick={handleUpload}
        disabled={isUploading || !selectedFile}
        className="w-full bg-[var(--accent)] text-white py-4 uppercase tracking-[0.4em] text-[10px] font-black hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ borderRadius: 'var(--btn-radius)' }}
      >
        {isUploading ? `Uploading (${uploadProgress}%)` : 'Upload Image'}
      </motion.button>
    </div>
  );
}
