import React, { useState } from "react";

interface TagFieldProps {
    tags: string[];
    onTagsChange: (newTags: string[]) => void;
}

const TagField: React.FC<TagFieldProps> = ({tags, onTagsChange}) => {
  const [inputValue, setInputValue] = useState("");

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle adding a tag
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
      e.preventDefault(); // Prevent form submission on Enter
      if (!tags.includes(inputValue.trim())) {
        onTagsChange([...tags, inputValue.trim()]); // Update tags in parent state
      }
      setInputValue(""); // Clear input
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove)); // Update tags in parent state
  };

  return (
    <div className="mb-3">
      <label className="block text-[12px] font-bold text-gray-700 mb-2">Tags</label>
      <div className="flex items-center flex-wrap border border-gray-300 rounded-md p-2 gap-2">
        {/* Render tags */}
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-[12px] font-medium"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}

        {/* Input for adding tags */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleAddTag}
          placeholder="Select tags/Add tags"
          className="flex-1 p-1 text-sm focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TagField;
