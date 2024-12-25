import Color from "../models/Color.ts";

interface SvgWellProps {
    className?: string;
    colors: Color[];
}

interface Slice {
    data: string
    color: string
}

function generateSlices(colors: Color[]) {
    const radius = 100
    const cx = 100
    const cy = 100
    const anglePerSlice = 360 / colors.length
    const slices: Slice[] = []

    for (let i = 0; i < colors.length; i++) {
        const startAngle = i * anglePerSlice;
        const endAngle = (i + 1) * anglePerSlice;

        const startX = cx + radius * Math.cos((Math.PI / 180) * startAngle);
        const startY = cy + radius * Math.sin((Math.PI / 180) * startAngle);
        const endX = cx + radius * Math.cos((Math.PI / 180) * endAngle);
        const endY = cy + radius * Math.sin((Math.PI / 180) * endAngle);

        const largeArcFlag = anglePerSlice > 180 ? 1 : 0;
        const d = `M ${cx} ${cy} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

        slices.push({
            data: d,
            color: colors[i].toString()
        });
    }

    return slices;
}

function SvgWell({className, colors}: SvgWellProps) {
    const slices = generateSlices(colors)

    return (
        <svg className={className} viewBox="0 0 200 200" >
            {
                slices.map((slice, i) => (
                    <path key={i} d={slice.data} fill={slice.color}/>
                ))
            }
        </svg>
    )
}

export default SvgWell