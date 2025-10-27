import Footer from "@/components/models/Footer/Footer"
import { Header } from "@/components/models/Header/Header"
import Stroks_V from "@/components/models/Strok_V/Stroks_V"


export default function Main() {
    return(
        <div className="bg-[#F0F0F0] ">
            <Header/>
            <main className="">
                <Stroks_V/>
            </main>
            <Footer/>
        </div>
    )
}