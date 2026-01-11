/**
 * Cloudinary Service
 * Handles image uploads, transformations, and asset management
 */

export interface CloudinaryUploadResponse {
  public_id: string;
  url: string;
  secure_url: string;
  version: number;
  format: string;
  resource_type: string;
  type: string;
  width?: number;
  height?: number;
  bytes?: number;
  created_at?: string;
}

export interface CloudinarySignature {
  signature: string;
  timestamp: number;
}

class CloudinaryService {
  private cloudName: string;
  private apiKey: string;

  constructor() {
    this.cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
    this.apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '';

    if (!this.cloudName) {
      console.warn('Cloudinary cloud name not configured');
    }
  }

  /**
   * Get an upload signature for client-side uploads
   * Signature should be generated server-side only
   */
  async getUploadSignature(): Promise<CloudinarySignature> {
    try {
      const response = await fetch('/api/cloudinary/signature', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to get upload signature');
      }

      return await response.json();
    } catch (error) {
      console.error('[CloudinaryService] Error getting upload signature:', error);
      throw error;
    }
  }

  /**
   * Generate an optimized URL for an image
   */
  getOptimizedUrl(
    publicId: string,
    width?: number,
    height?: number,
    quality: 'auto' | 'good' | 'best' = 'auto'
  ): string {
    if (!this.cloudName) return '';

    let transformations = [];

    if (width || height) {
      const params = [
        width && `w_${width}`,
        height && `h_${height}`,
        'c_fill',
        'g_auto', // Gravity auto for best framing
      ].filter(Boolean);
      transformations.push(params.join(','));
    }

    // Quality optimization
    transformations.push(`q_${quality}`);

    // Format optimization
    transformations.push('f_auto');

    const transform = transformations.length > 0 ? `/${transformations.join('/')}` : '';

    return `https://res.cloudinary.com/${this.cloudName}/image/upload${transform}/${publicId}`;
  }

  /**
   * Get thumbnail URL for grid display
   */
  getThumbnailUrl(publicId: string): string {
    return this.getOptimizedUrl(publicId, 400, 300, 'good');
  }

  /**
   * Get hero/full-width optimized URL
   */
  getHeroUrl(publicId: string, width: number = 2070): string {
    return this.getOptimizedUrl(publicId, width, undefined, 'best');
  }

  /**
   * Delete an image from Cloudinary
   */
  async deleteImage(publicId: string): Promise<boolean> {
    try {
      const response = await fetch('/api/cloudinary/asset', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      return true;
    } catch (error) {
      console.error('[CloudinaryService] Error deleting image:', error);
      return false;
    }
  }

  /**
   * Get the public URL for a Cloudinary asset
   */
  getPublicUrl(publicId: string): string {
    if (!this.cloudName) return '';
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${publicId}`;
  }

  /**
   * Get cloud name for widget initialization
   */
  getCloudName(): string {
    return this.cloudName;
  }

  /**
   * Check if Cloudinary is configured
   */
  isConfigured(): boolean {
    return !!this.cloudName && !!this.apiKey;
  }
}

export const cloudinaryService = new CloudinaryService();
