import Color from "../models/Color.ts";
import {useEffect, useRef} from "react";

interface CanvasWellProps {
    className?: string
    colors: Color[]
}

function CanvasWell({className, colors}: CanvasWellProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const container = containerRef.current!
        const canvas = canvasRef.current!
        const context = canvas.getContext("2d")!

        function update() {
            canvas.width = container.clientWidth
            canvas.height = container.clientHeight

            const centerX = canvas.width / 2
            const centerY = canvas.height / 2
            const radius = Math.min(canvas.width, canvas.height) / 2 + Math.min(canvas.width, canvas.height) / 8

            const imageData = context.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            if (colors.length === 0) {
                context.putImageData(imageData, 0, 0);
                return;
            }

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const dx = x - centerX;
                    const dy = y - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const pixelIndex = (y * canvas.width + x) * 4;

                    if (distance <= radius) {
                        let angle = Math.atan2(dy, dx) + Math.PI;

                        if (angle < 0) {
                            angle += 2 * Math.PI;
                        }

                        const colorIndex = Math.floor((angle / (2 * Math.PI)) * colors.length) % colors.length
                        const color = colors[colorIndex]

                        data[pixelIndex] = color.red;
                        data[pixelIndex + 1] = color.green;
                        data[pixelIndex + 2] = color.blue;
                        data[pixelIndex + 3] = color.alpha;
                    }
                }
            }

            context.putImageData(imageData, 0, 0);
        }

        update()
        container.addEventListener('resize', update)

        return () => {
            container.removeEventListener('resize', update)
        }
    }, [colors])

    return (
        <div ref={containerRef} className={className}>
            <canvas ref={canvasRef}/>
        </div>
    )
}

export default CanvasWell