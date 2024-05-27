import React from 'react';
import { ObjectData, Box, ClassType } from '../types/types';

interface SidebarProps {
  objectData: ObjectData;
  onBoxClick: (box: Box) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ objectData, onBoxClick }) => {
  const { boxes } = objectData;

  const handleBoxClick = (box: Box) => {
    onBoxClick(box);
  };

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      {Object.values(ClassType).map((className) => (
        <div key={className}>
          <h3 className="font-bold mb-2">{className}</h3>
          {boxes
            .filter((box) => box.class === className)
            .map((box,index) => (
              <div
                key={index}
                className="flex items-center cursor-pointer hover:bg-gray-300 rounded p-2 mb-2"
                onClick={() => handleBoxClick(box)}
              >
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span>{box.text}</span>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;