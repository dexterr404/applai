import cloudinary from "../config/cloudinary";

export function uploadResumetoCloudinary(fileBuffer: Buffer, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        public_id: `resume/${filename}-${Date.now()}`, // unique name
        overwrite: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url || '');
      }
    );

    uploadStream.end(fileBuffer);
  });
}