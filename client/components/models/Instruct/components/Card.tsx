import Image from "next/image"

interface CardProps {
  img?: string;            
  Title: string;
  Description: string;
}

export default function Card({ img, Title, Description}: CardProps) {
  return (
    <div className="w-[230px] h-[300px] rounded-4xl bg-white mr-[20px] p-[10px]">
      <div>
        {/* <Image src={img} alt={Title} width={300} height={200} />  */}
      </div>
      <div>
        <p>{Title}</p>
        <p>{Description}</p>
      </div>
    </div>
  );
}