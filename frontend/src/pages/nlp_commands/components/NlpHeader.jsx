import {Clock10} from 'lucide-react';

export const NlpHeader = ()=>{
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6">
            <div className="flex flex-col gap-2 max-w-[677px] max-h-[36px]">
                <h1 className="font-inter font-bold text-[30px] leading-8 text-[#0B1C30]">Administrative Command Console</h1>
                <p className="font-inter regular text-4 leading-6 text-[#565E74]">Execute natural language schedulin instructions directly against the academic database</p>
            </div>
            <div className="w-[174px] h-[38] bg-[#FFFFFF] border border-[#BDC8D1] text-[#0B1C30] rounded-sm px-2 py-1">
                <button className="flex items-center whitespace-nowrap gap-1 bg-none w-full h-full">
                    <Clock10 className="w-4 h-4"/>
                    Command History
                </button>
            </div>
        </div>
    )
}