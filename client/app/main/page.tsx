import Footer from "@/components/models/Footer/Footer"
import { Header } from "@/components/models/Header/Header"
import Insctruct from "@/components/models/Instruct/Instruct"
import Stroks_V from "@/components/models/Strok_V/Stroks_V"


export default function Main() {
    return(
        <div className="bg-[#F0F0F0] h-full">
            <Header/>
            <main className="">
                <Stroks_V/>
                <div className="mt-[150px]">
                    <Insctruct/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}