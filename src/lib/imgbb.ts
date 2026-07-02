export async function uploadImageToImgBB(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY as string;

  if (!apiKey) {
    throw new Error('ImgBB API key is not configured. Add VITE_IMGBB_API_KEY to your .env file.');
  }

  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('image', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgbb.com/1/upload');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response?.success && response?.data?.url) {
            resolve(String(response.data.url));
          } else {
            reject(new Error('ImgBB upload succeeded but returned an unexpected response.'));
          }
        } catch (error) {
          reject(new Error('Unable to parse ImgBB response.'));
        }
      } else {
        reject(new Error(`ImgBB upload failed with status ${xhr.status}.`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error while uploading the image to ImgBB.'));
    xhr.onabort = () => reject(new Error('ImgBB upload was aborted.'));
    xhr.send(formData);
  });
}
