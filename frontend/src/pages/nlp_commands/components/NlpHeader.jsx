import { useState } from 'react';
import { Clock10 } from 'lucide-react';
import { History } from './HistoryView';

export const NlpHeader = () => {
    const [isHistory, setIsHistory] = useState(false);

    const handleClick = () => {
        setIsHistory((prev) => !prev);
        console.log("clicked");
    };

    return (
        <>
            <div className="flex flex-col items-left md:flex-row gap-4 md:items-center justify-between pb-6">
                <div className="flex flex-col gap-2 max-w-[677px]">
                    <h1 className="font-inter font-bold text-[30px] leading-8 text-[#0B1C30]">Administrative Command Console</h1>
                    <p className="font-inter text-sm leading-6 text-[#565E74]">Execute natural language scheduling instructions directly against the academic database</p>
                </div>
                
                {/* Wrapper container */}
                <div className="w-[174px] h-[38px] bg-white border border-[#BDC8D1] text-[#0B1C30] rounded-sm px-2 py-1 flex items-center">
                    <button 
                        type="button"
                        onClick={handleClick} 
                        className="cursor-pointer outline-none flex items-center whitespace-nowrap gap-1 bg-transparent w-full h-full"
                    >
                        <Clock10 className="w-4 h-4"/>
                        Command History
                    </button>
                </div>
            </div>
            
            {isHistory && (
                <History />
            )}
        </>
    );
};