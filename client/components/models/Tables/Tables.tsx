'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

    export default function Tables() {
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const fileInput1Ref = useRef<HTMLInputElement>(null);
    const fileInput2Ref = useRef<HTMLInputElement>(null);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: (file: File | null) => void
    ) => {
        const file = e.target.files?.[0] || null;
        if (file && !file.name.toLowerCase().endsWith('.xlsx')) {
        alert('Пожалуйста, выберите файл в формате .xlsx');
        return;
        }
        setFile(file);
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        setFile: (file: File | null) => void
    ) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0] || null;
        if (file) {
        if (!file.name.toLowerCase().endsWith('.xlsx')) {
            alert('Пожалуйста, выберите файл в формате .xlsx');
            return;
        }
        setFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
        ref.current?.click();
    };

    const resetFile = (
        setFile: (file: File | null) => void,
        inputRef: React.RefObject<HTMLInputElement | null>
        ) => {
        setFile(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="w-[70%] m-auto mt-[70px]">
        <div>
            <div className="mb-[25px]">
            <h2 className="font-semibold text-[2rem]">Условные обозначения</h2>
            <p>Импортировать как..</p>
            </div>
            <div className="flex justify-between gap-4">
            {/* Левое поле */}
            <div
                className={`w-[48%] h-[65px] bg-white rounded-[20px] border border-[#80808040] hover:bg-[#007AFF] hover:text-white transition-colors duration-300 flex items-center cursor-pointer relative`}
                onClick={() => triggerFileInput(fileInput1Ref)}
                onDrop={(e) => handleDrop(e, setFile1)}
                onDragOver={handleDragOver}
            >
                <input
                type="file"
                accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ref={fileInput1Ref}
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e, setFile1)}
                />
                {file1 ? (
                <div className="flex items-center w-full px-[15px] justify-between">
                    <span className="text-sm font-medium truncate">{file1.name}</span>
                    <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        resetFile(setFile1, fileInput1Ref);
                    }}
                    className="text-white hover:text-gray-200 text-xs ml-2"
                    >
                    ✕
                    </button>
                </div>
                ) : (
                <div className="flex items-center pl-[15px]">
                    <Image src="/img_load.svg" width={30} height={30} alt="Загрузить" />
                    <div className="ml-[15px]">
                    <p className="text-sm">Перетащите документ сюда</p>
                    <p className="text-xs opacity-70">.xlsx</p>
                    </div>
                </div>
                )}
            </div>

            {/* Правое поле */}
            <div
                className={`w-[48%] h-[65px] bg-white rounded-[20px] border border-[#80808040] hover:bg-[#007AFF] hover:text-white transition-colors duration-300 flex items-center cursor-pointer relative`}
                onClick={() => triggerFileInput(fileInput2Ref)}
                onDrop={(e) => handleDrop(e, setFile2)}
                onDragOver={handleDragOver}
            >
                <input
                type="file"
                accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ref={fileInput2Ref}
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e, setFile2)}
                />
                {file2 ? (
                <div className="flex items-center w-full px-[15px] justify-between">
                    <span className="text-sm font-medium truncate">{file2.name}</span>
                    <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        resetFile(setFile2, fileInput2Ref);
                    }}
                    className="text-white hover:text-gray-200 text-xs ml-2"
                    >
                    ✕
                    </button>
                </div>
                ) : (
                <div className="flex items-center pl-[15px]">
                    <Image src="/img_load.svg" width={30} height={30} alt="Загрузить" />
                    <div className="ml-[15px]">
                    <p className="text-sm">Перетащите документ сюда</p>
                    <p className="text-xs opacity-70">.xlsx</p>
                    </div>
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
    }