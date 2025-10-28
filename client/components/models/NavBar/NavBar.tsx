import Image from 'next/image';


const btn = [
  {
    id: 1,
    title: "Изменено ГП"
  },
  {
    id: 2,
    title: "Изменено ТЗ цвет"
  },
  {
    id: 3,
    title: "Изменено ТЗ текст"
  },
];

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
            <p className="ml-[5px] font-semibold">MapDiv</p>
          </div>
          <button onClick={onToggle} aria-label="Свернуть панель">
            <Image src="sidebar_toggle_24.svg" width={30} height={30} alt="toggle" />
          </button>
        </div>

        <div
          className="hide-scrollbar mt-4 flex overflow-x-auto whitespace-nowrap space-x-2 pb-2"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {btn.map((item) => (
            <button
              key={item.id}
              className="flex-shrink-0 px-4 py-2 bg-[#EBEBEB] hover:bg-black hover:text-white rounded-4xl whitespace-nowrap transition-colors duration-300"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}