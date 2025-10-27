import Card from "./components/Card";

const Cards = [
    {
        id: 1,
        img: "sdfsd",
        Title: 'Title',
        Description:"блаблаблаблаблабал",
    },
        {
        id: 2,
        img: "sdfsd",
        Title: 'Title',
        Description:"блаблаблаблаблабал",
    },
        {
        id: 3,
        img: "sdfsd",
        Title: 'Title',
        Description:"блаблаблаблаблабал",
    },
]

export default function Insctruct() {
    return(
        <div className="w-full">
            <div className="ml-[70px] mb-[50px]">Инструкция</div>
            <div className="flex justify-center w-full">
                <div className="flex">
                    {Cards.map((card) => (
                    <Card
                        key={card.id}
                        img={card.img}
                        Title={card.Title}
                        Description={card.Description}
                    />
                    ))}
                </div>        
        </div>
        </div>
    )
}