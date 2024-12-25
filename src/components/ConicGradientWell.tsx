import Color from "../models/Color.ts";

interface ConicGradientWellProps {
    className?: string
    colors: Color[]
}

function generateGradientStyle(colors: Color[]) {
    const anglePerSlice = 360 / colors.length;

    return colors.map((color, i) => {
        const startAngle = anglePerSlice * i;
        const endAngle = startAngle + anglePerSlice;
        return `${color.toString()} ${startAngle}deg ${endAngle}deg`
    }).join(', ')
}

function ConicGradientWell({className, colors}: ConicGradientWellProps) {
    const gradient = `conic-gradient(${generateGradientStyle(colors)})`

    return (
        <div className={`${className ?? ""}`} style={{background: gradient}} />
    )
}

export default ConicGradientWell