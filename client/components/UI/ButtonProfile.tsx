import Link from "next/link"

export default function BtnProf() {
    return(
        <Link href={"/profile"}>
            <button className="w-[30px] h-[30px] rounded-full bg-black text-white ml-[20px] align-middle">
                A
            </button>
        </Link>
    )
}