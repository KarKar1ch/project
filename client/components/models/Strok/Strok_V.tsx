import { useRef, useState } from 'react';

type Strok_VProps = {
  className?: string;
  onFileUpload: (file: File | null) => void;
};

export default function Strok_V({ className, onFileUpload }: Strok_VProps) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      alert('Пожалуйста, выберите изображение в формате JPG или PNG.');
      onFileUpload(null);
      return;
    }

    setLoading(true);
    setProgress(0);
    setFileUploaded(false);
    setImageSrc(null);

    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
      }
    };

    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageSrc(result);
      setFileUploaded(true);
      setLoading(false);
      onFileUpload(file);
    };

    reader.onerror = () => {
      alert('Ошибка при чтении файла.');
      setLoading(false);
      onFileUpload(null);
    };

    // Запускаем чтение как Data URL — это триггерит onprogress
    reader.readAsDataURL(file);
  };

  const triggerFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`w-[550px] h-[350px] bg-white hover:bg-[#007AFF] hover:text-white transition-colors duration-300 rounded-[40px] p-[10px] ${className}`}>
      <input
        type="file"
        accept="image/jpeg, image/png"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      <div
        className={`border-[2px] border-[#80808060] rounded-[28px] h-full w-full flex items-center justify-center ${
          dragOver ? 'border-blue-500' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={triggerFileDialog}
        style={{ cursor: 'pointer', overflow: 'hidden' }}
      >
        {loading ? (
          // Прогресс-бар
          <div className="flex flex-col items-center justify-center w-full px-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm">Загрузка изображения...</p>
            <p className="text-xs text-gray-500">{progress}%</p>
          </div>
        ) : fileUploaded && imageSrc ? (
          <img
            src={imageSrc}
            alt="Загруженное изображение"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              borderRadius: '28px',
            }}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <img src="/img_load.svg" height={250} width={250} alt="Загрузка" className="m-auto" />
            <p className="font-semibold">Выберите изображение карты</p>
            <p>или перетащите сюда</p>
            {dragOver && <p style={{ color: 'blue' }}>Отпустите файл для загрузки</p>}
          </div>
        )}
      </div>
    </div>
  );
}