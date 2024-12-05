import { useState, useRef } from "react";

const ImageUploadField = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setPreview(imagePreviewUrl);
    }
  };

  // Trigger file input on container click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-3 flex w-full max-h-[300px]">

      {/* Image Container (acts as input field) */}
      <div
        onClick={triggerFileInput}
        className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center rounded-md cursor-pointer transition"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <span className="text-gray-500 text-sm">Click to upload</span>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadField;
