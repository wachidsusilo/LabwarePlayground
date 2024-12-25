import {useEffect, useRef, useState} from "react";
import Labware, {WellType} from "./components/Labware.tsx";
import Select from "./components/Select.tsx";
import {generateRainbowColors} from "./utilities/utils.ts";
import Button from "./components/Button.tsx";
import Color from "./models/Color.ts";

const wellTypes: WellType[] = [
    "Canvas",
    "Conic Gradient",
    "SVG Element"
]

function App() {
    const [render, setRender] = useState<boolean>(false);

    const timeRef = useRef<HTMLHeadingElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const renderRef = useRef<boolean>(false);
    const startTime = performance.now()
    const wellTypeRef = useRef<WellType>("Canvas");

    const colorCount = parseInt(inputRef.current?.value ?? "");
    const colors = generateRainbowColors(renderRef.current ? isNaN(colorCount) ? 384 : colorCount : 0);

    useEffect(() => {
        const endTime = performance.now()

        timeRef.current!.innerText = `${Math.ceil(endTime - startTime)} ms`
    }, [startTime])

    return (
        <div className="mt-16 flex flex-col justify-center items-center">
            <div
                className="w-[1088px] h-[702px] p-[16px] bg-[#11171d] rounded-2xl outline outline-[1px] outline-[#1e252c] ">
                <Labware wellType={wellTypeRef.current} colors={colors}/>
            </div>
            <div className="w-full h-12 flex justify-between gap-4 mt-4">
                <div className="grid grid-cols-[90px_2px_1fr] gap-2">
                    <p>Color Count</p>
                    <p>:</p>
                    <input ref={inputRef}
                           className="flex items-center bg-transparent outline-0 pt-0.5 "
                           type="text"
                           placeholder="384 (default)"
                           onInput={e => e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')}/>
                    <p>Render Time</p>
                    <p>:</p>
                    <p ref={timeRef}></p>
                </div>
                <div className="flex gap-4">
                    <Select className="w-48"
                            options={wellTypes}
                            value={wellTypeRef.current}
                            onItemSelected={(selectedItem) => wellTypeRef.current = (selectedItem as WellType)}/>
                    <Button className="h-[32px]" label="Render" color={new Color(89, 212, 153)}
                            onClick={() => {
                                renderRef.current = true
                                setRender(!render)
                            }}/>
                </div>
            </div>
        </div>
    )
}

export default App
