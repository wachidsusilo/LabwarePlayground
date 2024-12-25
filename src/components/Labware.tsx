import CanvasWell from "./CanvasWell.tsx";
import Color from "../models/Color.ts";
import ConicGradientWell from "./ConicGradientWell.tsx";
import SvgWell from "./SvgWell.tsx";

export type WellType = "Canvas" | "Conic Gradient" | "SVG Element"

interface LabwareProps {
    className?: string
    wellType: WellType
    colors: Color[]
}

function Labware({className, wellType, colors}: LabwareProps) {
    const wells = Array(384).fill(0).map((_, index) => index);

    return (
        <div
            className={`grid grid-cols-[repeat(24,_minmax(0,_1fr))] grid-rows-[repeat(16,_minmax(0,_1fr))] gap-[2px] ${className}`}>
            {
                wells.map((value) => {
                    switch (wellType) {
                        case "SVG Element":
                            return <SvgWell key={value}
                                            className="w-[40px] h-[40px] rounded-full overflow-hidden bg-black"
                                            colors={colors}/>
                        case "Conic Gradient":
                            return <ConicGradientWell key={value}
                                                      className="w-[40px] h-[40px] rounded-full overflow-hidden bg-black"
                                                      colors={colors}/>
                        case "Canvas":
                        default:
                            return <CanvasWell key={value}
                                               className="w-[40px] h-[40px] rounded-full overflow-hidden bg-black"
                                               colors={colors}/>
                    }
                })
            }
        </div>
    )
}

export default Labware