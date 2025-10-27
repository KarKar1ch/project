"use client"
import { useState } from 'react';
import axios from 'axios';
import Strok_V from '../Strok/Strok_V';

export default function Stroks_V() {
  const [isFile1Loaded, setFile1Loaded] = useState(false);
  const [isFile2Loaded, setFile2Loaded] = useState(false);

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFile1Upload = (loaded: boolean) => {
    setFile1Loaded(loaded);
  };

  const handleFile2Upload = (loaded: boolean) => {
    setFile2Loaded(loaded);
  };

  const isButtonEnabled = isFile1Loaded && isFile2Loaded;

    const handleCompare = () => {
    if (file1 && file2) {
      const formData = new FormData();
      formData.append('file1', file1);
      formData.append('file2', file2);

      axios.post('/your-server-endpoint', formData)
        .then((response) => {
          // Обработка ответа сервера
          console.log('Результат сравнения:', response.data);
        })
        .catch((error) => {
          console.error('Ошибка отправки файлов:', error);
        });
    }
  };

  return (
    <div className="mt-[40px]">
        <div className='w-full flex justify-center'>
          <div>
            <p className='font-semibold'>Первая версия</p>
              <Strok_V className="mr-[20px] mt-[10px]" onFileUpload={handleFile1Upload} />
          </div>
          <div>
            <p className='font-semibold'>Вторая версия</p>
              <Strok_V className='mt-[10px]' onFileUpload={handleFile2Upload} />
          </div>
        </div>
        <div className='w-full flex justify-center mt-[50px]'>
          <button
            className={`w-[150px] h-[30px] rounded-3xl ${isButtonEnabled ? 'bg-green-500 hover:bg-[#F0F0F0] transition-colors duration-300' : 'bg-black text-[white]'}`}
            disabled={!isButtonEnabled}
            onClick={handleCompare}
          >
              Сравнить
          </button>
        </div>
    </div>
  );
}