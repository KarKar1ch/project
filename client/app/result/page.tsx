'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useComparisonStore } from '@/state/useComparisonStore';
import Link from 'next/link';
import NavBar from '@/components/models/NavBar/NavBar';

export default function Result() {
  const comparisonResult = useComparisonStore((state) => state.comparisonResult);
  const [sidebarOpen, setSidebarOpen] = useState(true); // по умолчанию открыт

  if (!comparisonResult) {
    return (
      <div className="mt-10 text-center">
        <p className="mb-4">Нет данных для отображения.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Вернуться к сравнению
        </Link>
      </div>
    );
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = comparisonResult;
    link.download = 'comparison_result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Zoom & Pan логика (остаётся без изменений) ---
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.min(Math.max(scale + (e.deltaY > 0 ? -0.1 : 0.1), 0.5), 5);
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);
  // ---

  return (
    <div className="flex h-screen">
      {/* Сайдбар отображается только если открыт */}
      {sidebarOpen && <NavBar onToggle={() => setSidebarOpen(false)} />}

      {/* Основной контент */}
      <div
        className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        style={{ touchAction: 'none' }}
      >
        <img
          src={comparisonResult}
          alt="Результат сравнения"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.1s ease',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />

        {/* Кнопка скачивания */}
        <button
          onClick={handleDownload}
          className="absolute top-4 right-4 w-[40px] h-[40px] bg-white z-[10] hover:bg-[#F0F0F0] rounded-[10px] shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition-colors duration-300"
          aria-label="Скачать результат"
        >
          <Image src="export_24.svg" width={30} height={30} alt="Экспорт" className="m-auto" />
        </button>

        {!sidebarOpen && (
          <>
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute top-4 left-25 w-[40px] h-[40px] bg-white z-[10] rounded-[10px] shadow-[0_2px_6px_rgba(0,0,0,0.2) hover:bg-[#F0F0F0]] transition-colors duration-300"
              aria-label="Открыть панель"
            >
                <Image src="sidebar_toggle_24.svg" width={30} height={30} alt="Открыть панель" className="m-auto" />
            </button>
            <div className="absolute top-4 left-10 flex items-center shadow-[0_2px_6px_rgba(0,0,0,0.2)">
                <Image src="Logo.svg" width={40} height={40} alt="logo" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}