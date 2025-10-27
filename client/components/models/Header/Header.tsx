import BtnProf from "@/components/UI/ButtonProfile";
import BtnHstr from "./componets/ButtonHistory";


export function Header(){
    return(
        <header className="bg-white h-[52px]">
            <div className="flex justify-end p-[10px]">
                <div>
                    <BtnHstr/>
                    <BtnProf/>
                </div>
            </div>
        </header>
    )
}