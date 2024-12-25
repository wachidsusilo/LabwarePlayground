import Color from "../models/Color.ts";
import {RocketLaunchIcon} from "@heroicons/react/24/outline";

interface ButtonProps {
    className?: string
    label?: string
    color?: Color
    onClick?: () => void
}

function Button({className, label, color = new Color(), onClick}: ButtonProps) {
    return (
        <button
            className={`py-2 px-4 justify-self-end flex items-center justify-center
            text-sm rounded-lg cursor-pointer group shrink-on-click ${className ?? ""}`}
            style={{
                color: `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.opacity})`,
                backgroundColor: `rgba(${color.red}, ${color.green}, ${color.blue}, 0.15)`
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, 0.2)`
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, 0.15)`
            }}
            onClick={() => {
                if (onClick) onClick()
            }}>

            <RocketLaunchIcon className="w-4 h-4"/>
            <span className="ml-2 flex whitespace-nowrap">{label}</span>
        </button>
    )
}

export default Button