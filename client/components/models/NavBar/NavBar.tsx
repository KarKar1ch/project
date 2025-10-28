import Image from 'next/image';


interface NavBarProps {
  onToggle: () => void;
}

export default function NavBar({ onToggle }: NavBarProps) {
  return (
    <div className="w-[30%] bg-white h-screen flex flex-col">
      <div className="p-[20px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="Logo.svg" width={40} height={40} alt="logo" />
            <p className="ml-[10px] font-semibold">MapDiv</p>
          </div>
          <button onClick={onToggle} aria-label="Свернуть панель">
            <Image src="sidebar_toggle_24.svg" width={30} height={30} alt="toggle" />
          </button>
        </div>
        <div
          className="hide-scrollbar mt-4 flex overflow-x-auto whitespace-nowrap space-x-2 pb-2 mt-[40px]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
            <button 
              className='flex-shrink-0 px-4 py-2 bg-[#EBEBEB] hover:bg-[#0D99FF] hover:text-white rounded-4xl whitespace-nowrap transition-colors duration-300'>
                Изменено ГП
            </button>
            <button 
              className='flex-shrink-0 px-4 py-2 bg-[#EBEBEB] hover:bg-[#9747FF] hover:text-white rounded-4xl whitespace-nowrap transition-colors duration-300'>
              Изменено ТЗ цвет
            </button>
            <button 
              className='flex-shrink-0 px-4 py-2 bg-[#EBEBEB] hover:bg-[#FF24BD] hover:text-white rounded-4xl whitespace-nowrap transition-colors duration-300'>
              Изменено ТЗ текст
            </button>
        </div>
      </div>
      <div className='flex justify-center'>
        <div >
            <Image src="filter_add.svg" width={250} height={250} alt="filter"/>
            <p className='text-center font-semibold text-[1.3rem]'>Выберите фильтр</p>
        </div>
      </div>
    </div>
  );
}