export function getPdfThumbnail(pdfUrl: string) {
    // Extract the base path from the original Cloudinary URL
    return pdfUrl
      .replace('/upload/', '/upload/pg_1,w_500,h_300,c_fill/') // Resize and crop
      .replace('.pdf', '.jpg'); // Convert to image
}
  