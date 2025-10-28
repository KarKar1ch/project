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

export default function NavBar() {
  return (
    <>
    <div className="w-[30%] bg-white h-screen">
        <div className="">
            <div className="flex justify-between p-[10px]">
            <div>
                <div className="flex">
                <Image src="Logo.svg" width={40} height={40} alt="logo" className="align-middle" />
                <p className="ml-[5px] font-semibold align-middle">MapDiv</p>
                </div>
            </div>
            <div>
                <Image src="sidebar_toggle_24.svg" width={30} height={30} alt="toggle" className="align-middle" />
            </div>
            </div>
                <div 
                    className="hide-scrollbar flex overflow-x-auto whitespace-nowrap space-x-2 pb-2"   
                    style={{
                        WebkitOverflowScrolling: 'touch', 
                    }}>
                    {btn.map((item) => (
                        <button
                        key={item.id}
                        className="flex-shrink-0 px-4 py-2 bg-[#EBEBEB] rounded-4xl whitespace-nowrap"
                        >
                        {item.title}
                        </button>
                    ))}
                </div>
        </div>
    </div>
    </>
  );
}