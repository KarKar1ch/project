import Footer from "@/components/models/Footer/Footer"
import { Header } from "@/components/models/Header/Header"
import ProgressBar from "@/components/models/ProgressBar/ProgressBar"
import Stroks_V from "@/components/models/Strok_V/Stroks_V"


export default function Main() {
    return(
        <div className="bg-[#F0F0F0] h-full">
            <Header/>
            <main className="">
                <Stroks_V/>
                <div className="mt-[150px]">
                    <ProgressBar/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}