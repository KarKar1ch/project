import BtnProf from "@/components/UI/ButtonProfile";
import BtnHstr from "./componets/ButtonHistory";
import Image from "next/image";


export function Header(){
    return(
        <header className="bg-white h-[52px]">
            <div className="flex justify-between p-[10px]">
                <div className="flex">
                    <Image className="align-middle" src="/Logo.svg" width={30} height={30} alt=""/>
                    <p className="font-semibold ml-[15px] align-middle">MapDiv</p>
                </div>
                <div>
                    <BtnHstr/>
                    <BtnProf/>
                </div>
            </div>
        </header>
    )
}