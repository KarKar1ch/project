"use client"
import { useState, DragEvent } from 'react';

interface Strok_VProps {
  className?: string;
  onFileUpload?: (uploaded: boolean) => void;
}

export default function Strok_V({ className, onFileUpload }: Strok_VProps) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);  

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const objectUrl = URL.createObjectURL(file);
        setImageSrc(objectUrl); 
        setFileUploaded(true);
        if (onFileUpload) {
          onFileUpload(true);
        }
      }
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div
      className={`w-[550px] h-[350px] bg-[white] rounded-4xl p-[10px] ${className}`}
    >
      <div
        className={`border border-dashed rounded-4xl h-full w-full p-[10px] flex items-center justify-center ${
          dragOver ? 'border-blue-500' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{ cursor: 'pointer', overflow: 'hidden' }} 
      >
        {fileUploaded && imageSrc ? (
          <img
            src={imageSrc}
            alt="Загруженное изображение"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p>Перетащите изображение карты сюда</p>
            <p>JPG, PNG</p>
            {dragOver && <p style={{ color: 'blue' }}>Отпустите файл для загрузки</p>}
          </div>
        )}
      </div>
    </div>
  );
}