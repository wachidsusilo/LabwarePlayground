import {useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {PuzzlePieceIcon} from "@heroicons/react/20/solid";

interface SelectProps {
    className?: string
    value?: string
    options: string[]
    onItemSelected?: (selected: string) => void
}

function Select({className, value, options, onItemSelected}: SelectProps) {
    const [selectedItem, setSelectedItem] = useState(value)
    const [isOpen, setOpen] = useState(false)

    return (
        <div className={`rounded-lg self-start border border-white/10 
            overflow-hidden transition duration-300 z-10 ${className ?? ""}`}
             style={{
                 background: isOpen ? 'rgba(0, 0, 0, 0.6)' : 'transparent'
             }}>
            <div
                className="w-full h-8 flex items-center gap-2.5 px-2.5 cursor-pointer"
                onClick={() => {
                    setOpen(!isOpen)
                }}>
                <PuzzlePieceIcon className="w-3.5 h-3.5"/>
                <h4 className="w-[calc(100%-3.125rem)] text-sm overflow-hidden text-ellipsis">{selectedItem}</h4>
                <ChevronDownIcon
                    className="w-4 h-4 transition"
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}/>
            </div>
            <div
                className="w-full transition-[height] duration-300 overflow-hidden"
                style={{
                    height: isOpen ? `${1.75 * options.length + 1}rem` : 0
                }}>
                <div className="w-full py-2 flex flex-col overflow-hidden">
                    {
                        options.map((value, index) => (
                            <h4 key={index} className="w-full h-7 pl-3 md:pl-8.5 pr-2.5 flex items-center text-sm
                                            cursor-pointer hover:bg-white/10 overflow-hidden text-ellipsis"
                                onClick={() => {
                                    setOpen(false)
                                    setSelectedItem(value)

                                    if (onItemSelected) {
                                        onItemSelected(value)
                                    }
                                }}>
                                {value}
                            </h4>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Select;