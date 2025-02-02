export type MediaType = 'image' | 'video';

export interface ProcessedMedia {
  url: string;
  type: MediaType;
  file: File;
}

export const processMedia = async (file: File): Promise<ProcessedMedia> => {
  const type: MediaType = file.type.startsWith('image/') ? 'image' : 'video';
  
  if (type === 'image') {
    return processImage(file);
  } else {
    return processVideo(file);
  }
};

const processImage = async (file: File): Promise<ProcessedMedia> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      // Calculate dimensions to maintain 4:5 aspect ratio
      let width = img.width;
      let height = img.height;
      const targetAspectRatio = 4 / 5;
      
      if (width / height > targetAspectRatio) {
        width = height * targetAspectRatio;
      } else {
        height = width / targetAspectRatio;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw image with calculated dimensions and converting canvas to blob
      ctx.drawImage(img, 0, 0, width, height);

    
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Could not create blob'));
          return;
        }
        const processedFile = new File([blob], file.name, { type: file.type });
        const url = URL.createObjectURL(processedFile);
        resolve({
          url,
          type: 'image',
          file: processedFile
        });
      }, file.type);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

const processVideo = async (file: File): Promise<ProcessedMedia> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      let width = video.videoWidth;
      let height = video.videoHeight;
      const targetAspectRatio = 4 / 5;
      
      if (width / height > targetAspectRatio) {
        width = height * targetAspectRatio;
      } else {
        height = width / targetAspectRatio;
      }

      video.width = width;
      video.height = height;

      // Create URL for the original video file
      const url = URL.createObjectURL(file);
      
      resolve({
        url,
        type: 'video',
        file
      });
    };

    video.onerror = () => reject(new Error('Failed to load video'));
    video.src = URL.createObjectURL(file);
  });
};

export const validateMedia = (file: File) => {
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const validVideoTypes = ['video/mp4', 'video/webm'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validImageTypes.includes(file.type) && !validVideoTypes.includes(file.type)) {
    throw new Error('Please upload a valid image (JPEG, PNG, GIF) or video (MP4, WebM) file');
  }

  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB');
  }

  return file.type.split('/')[0] as 'image' | 'video';
}; 