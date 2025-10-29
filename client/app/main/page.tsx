import Footer from "@/components/models/Footer/Footer"
import { Header } from "@/components/models/Header/Header"
import Stroks_V from "@/components/models/Strok_V/Stroks_V"
import Tables from "@/components/models/Tables/Tables"
import { Table } from "lucide-react"


export default function Main() {
    return(
        <div className="bg-[#F0F0F0] ">
            <Header/>
            <main className="">
                <Stroks_V/>
                <Tables/>
            </main>
            <Footer/>
        </div>
    )
}