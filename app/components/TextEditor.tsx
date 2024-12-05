import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import ReactQuill styles

// Dynamically import ReactQuill for Next.js SSR compatibility
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, placeholder, className }) => {
  // Define default modules for the editor
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder={placeholder || "Write something here..."}
      className={`border border-gray-300 rounded-md ${className || ""}`}
    />
  );
};

export default TextEditor;
