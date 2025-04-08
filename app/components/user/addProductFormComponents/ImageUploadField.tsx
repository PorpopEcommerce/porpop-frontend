import { useState } from "react";
import { BsFileImageFill } from "react-icons/bs";

interface ImageUploadFieldProps {
  onImageUpload?: (files: File[]) => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  onImageUpload,
}) => {
  const [images, setImages] = useState<File[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files);
      setImages((prev) => [...prev, ...newImages]);

      if (onImageUpload) {
        onImageUpload([...images, ...newImages]); // Ensure updated state is passed
      }
    }
  };
  

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 bg-dark-500 border-dark-400 space-y-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        {images.length > 0 ? (
          <div className="flex gap-4 mt-4 flex-wrap">
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded Preview"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-primary-500 p-2 rounded-lg">
            <BsFileImageFill className="text-white text-xl" />
          </div>
        )}
        <p className="text-grey-200 text-center">
          Drag and drop images here or click to add images
        </p>
        <button
          type="button"
          className="mt-2 bg-primary-50 text-primary-700 hover:opacity-80 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border text-sm"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("fileInput")?.click();
          }}
        >
          Add Images
        </button>
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploadField;
