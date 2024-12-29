/**
 * 验证图片文件
 */
export function validateImage(file: File): string | null {
  // 检查文件大小 (4MB)
  const maxSize = 4 * 1024 * 1024;
  if (file.size > maxSize) {
    return '图片大小不能超过 4MB';
  }

  // 检查文件格式
  const validFormats = ['jpg', 'jpeg', 'png', 'bmp'];
  const format = file.name.split('.').pop()?.toLowerCase();
  if (!format || !validFormats.includes(format)) {
    return '仅支持 JPG、PNG、BMP 格式的图片';
  }

  return null;
}

// 为了保持向后兼容，添加一个别名
export const validateImageFile = validateImage;