import React, { useEffect, useState, useRef } from 'react';
import { ObjectData, Box, ClassType } from '../types/types';

interface CanvasProps {
  objectData: ObjectData;
}

const Canvas: React.FC<CanvasProps> = ({ objectData }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setCanvasWidth(ref.current.offsetWidth);
        setCanvasHeight(ref.current.offsetHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { base64, boxes } = objectData;

  const getClassColor = (className: ClassType | string): any => {
    switch (className) {
      case ClassType.Name:
        return 'bg-blue-500';
      case ClassType.Description:
        return 'bg-green-500';
      case ClassType.Date:
        return 'bg-yellow-500';
      case ClassType.Amount:
        return 'bg-red-500';
      case ClassType.Supplier:
        return 'bg-purple-500';
      case ClassType.Number:
        return 'bg-indigo-500';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="relative flex justify-center items-center" ref={ref} >
      <img src={base64} alt="Image" className="max-w-full max-h-full" />
      {boxes.map((box, index) => {
        const scaledLeft = (box.points[0] / canvasWidth) * 100;
        const scaledTop = (box.points[1] / canvasHeight) * 100;
        const scaledWidth = ((box.points[2] - box.points[0]) / canvasWidth) * 100;
        const scaledHeight = ((box.points[3] - box.points[1]) / canvasHeight) * 100;

        return (
          <div
            key={index}
            className={`absolute z-10 ${getClassColor(box.class)} border-2 border-white rounded`}
            style={{
              left: `${scaledLeft}%`,
              top: `${scaledTop}%`,
              width: `${scaledWidth}%`,
              height: `${scaledHeight}%`,
            }}
          >
            <span className="text-base">{box.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Canvas;
