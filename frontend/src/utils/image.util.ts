export const compressImage = (
  base64String: string,
  maxWidth = 1024,
  quality = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64String;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // 如果图片宽度大于最大宽度，按比例缩小
      if (width > maxWidth) {
        height = Math.floor((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("无法获取 canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // 转换为 base64，使用较低的质量
      const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedBase64);
    };

    img.onerror = () => {
      reject(new Error("图片加载失败"));
    };
  });
};
