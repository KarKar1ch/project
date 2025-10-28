import Image from "next/image"

export default function NavBar(){
    return(
        <div className="w-[30%] bg-white h-screen">
            <div className="">
                <div className="flex justify-between p-[10px]">
                    <div>
                        <div className="flex">
                            <Image src="Logo.svg" width={40} height={40} alt="logo" className="align-middle"/>
                            <p className="ml-[5px] font-semibold align-middle">MapDiv</p>
                        </div>
                    </div>
                    <div><Image src="sidebar_toggle_24.svg" width={30} height={30} alt="logo" className="align-middle"/></div>
                </div>
                <div className=""></div>
            </div>
        </div>
    )
}