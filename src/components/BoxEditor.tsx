import React, { useState } from 'react';
import { Box, ClassType } from '../types/types';

interface BoxEditorProps {
  box: Box;
  onUpdateBox: (updatedBox: Box) => void;
  onDeleteBox: (box: Box) => void;
}

const BoxEditor: React.FC<BoxEditorProps> = ({ box, onUpdateBox, onDeleteBox }) => {
  const [text, setText] = useState(box.text);
  const [className, setClassName] = useState(box.class);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClassName(event.target.value as ClassType);
  };

  const handleSave = () => {
    const updatedBox: Box = {
      ...box,
      text,
      class: className,
    };
    onUpdateBox(updatedBox);
  };

  const handleDelete = () => {
    onDeleteBox(box);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-gray-300 rounded shadow-md">
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        className="w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <select
        value={className}
        onChange={handleClassChange}
        className="w-full mb-2 p-2 border border-gray-300 rounded"
      >
        {Object.values(ClassType).map((classType, index) => (
          <option key={index} value={classType}>
            {classType}
          </option>
        ))}
      </select>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BoxEditor;