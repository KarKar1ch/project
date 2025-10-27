import { BookOpen } from 'lucide-react';

export default function BtnHstr() {
    return(
        <button className="bg-[#F0F0F0] w-[124px] h-[30px] rounded-4xl p-[5px] align-middle">
            <div className='w-[124px] h-[30px] flex'>
                <BookOpen className='mr-[10px] text-xs w-[20px]'/>
                <p className='text-base'>История</p>
            </div>
        </button>
    )                        
}