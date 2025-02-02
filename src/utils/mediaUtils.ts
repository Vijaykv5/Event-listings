export const resizeImage = (file: File, aspectRatio: number = 4/5): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions to match aspect ratio
        if (width / height > aspectRatio) {
          width = height * aspectRatio;
        } else {
          height = width / aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
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