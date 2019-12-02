export function fileUpload(files, filePath) {
  const { image } = files;
  const imagePath = `public/uploads/${filePath}`;
  image.mv(`${__dirname}/../${imagePath}`, err => {
    if (err) {
      throw err;
    }
  });
  return imagePath;
}
