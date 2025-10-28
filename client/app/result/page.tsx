'use client';

import { useComparisonStore } from '@/state/useComparisonStore';
import Link from 'next/link';
import NavBar from '@/components/models/NavBar/NavBar';

export default function Result() {
  const comparisonResult = useComparisonStore((state) => state.comparisonResult);

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

  return (
    <div className="flex">
      <NavBar/>
      <img
        src={comparisonResult}
        alt="Результат сравнения"
        style={{
          width: '100%',
          height: '100vh',
        }}
      />
    </div>
  );
}