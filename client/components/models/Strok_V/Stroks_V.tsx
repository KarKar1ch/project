"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Strok_V from '../Strok/Strok_V';

export default function Stroks_V() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [comparisonResult, setComparisonResult] = useState<string>('');

  const isButtonEnabled = file1 !== null && file2 !== null;

  const handleCompare = () => {
    if (file1 && file2) {
      const formData = new FormData();
      formData.append('image1', file1);
      formData.append('image2', file2);

      axios.post('http://localhost:5000/compare', formData, {
        responseType: 'blob'
      })
        .then((response) => {
          const imageUrl = URL.createObjectURL(response.data);
          setComparisonResult(imageUrl);
        })
        .catch((error) => {
          console.error('Ошибка:', error);
          alert('Не удалось обработать изображения.');
        });
    }
  };

  // Очистка URL при размонтировании или смене изображения (опционально)
  useEffect(() => {
    return () => {
      if (comparisonResult) {
        URL.revokeObjectURL(comparisonResult);
      }
    };
  }, [comparisonResult]);

  return (
    <div className="mt-[40px]">
      <div className='w-full flex justify-center'>
        <div>
          <p className='font-semibold'>Первая версия</p>
          <Strok_V className="mr-[20px] mt-[10px]" onFileUpload={setFile1} />
        </div>
        <div>
          <p className='font-semibold'>Вторая версия</p>
          <Strok_V className='mt-[10px]' onFileUpload={setFile2} />
        </div>
      </div>

      <div className='w-full flex justify-center mt-[50px]'>
        <button
          className={`w-[150px] h-[30px] rounded-3xl ${
            isButtonEnabled 
              ? 'bg-black hover:bg-[#F0F0F0] text-white transition-colors duration-300' 
              : 'bg-gray-400 text-white'
          }`}
          disabled={!isButtonEnabled}
          onClick={handleCompare}
        >
          Сравнить
        </button>
      </div>

      {comparisonResult && (
        <div className="mt-6 flex flex-col items-center">
          <h3 className="font-semibold mb-2">Результат сравнения:</h3>
          <img 
            src={comparisonResult} 
            alt="Результат сравнения" 
            className="max-w-full h-auto border rounded"
          />
        </div>
      )}
    </div>
  );
}