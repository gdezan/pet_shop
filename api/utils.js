export function fileUpload(files, filePath) {
  const { image } = files;
  const imagePath = `assets/uploads/${filePath}`;
  image.mv(`${__dirname}/../src/${imagePath}`, err => {
    if (err) {
      throw err;
    }
  });
  return imagePath;
}
