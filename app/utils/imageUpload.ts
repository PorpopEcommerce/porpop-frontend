export const uploadImageToCloudinary = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hh6qxrdd"); // Replace with your preset


    const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/dbzrta7yr/image/upload`;
  
    try {
      const response = await fetch(
        CLOUDINARY_API_URL,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
  
      const data = await response.json();
      return data.secure_url; // Return only the image URL
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };
  