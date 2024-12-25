import Color from "../models/Color.ts"

export function generateRainbowColors(n: number): Color[] {
    const colors: Color[] = []

    for (let i = 0; i < n; i++) {
        const hue = (i * 360 / n) % 360
        colors.push(hslToRgb(hue, 100, 50))
    }

    return colors
}

function hslToRgb(h: number, s: number, l: number): Color {
    s /= 100
    l /= 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2

    let rgb

    if (h >= 0 && h < 60) {
        rgb = {r: c, g: x, b: 0}
    } else if (h >= 60 && h < 120) {
        rgb = {r: x, g: c, b: 0}
    } else if (h >= 120 && h < 180) {
        rgb = {r: 0, g: c, b: x}
    } else if (h >= 180 && h < 240) {
        rgb = {r: 0, g: x, b: c}
    } else if (h >= 240 && h < 300) {
        rgb = {r: x, g: 0, b: c}
    } else {
        rgb = {r: c, g: 0, b: x}
    }

    return new Color(
        Math.round((rgb.r + m) * 255),
        Math.round((rgb.g + m) * 255),
        Math.round((rgb.b + m) * 255)
    )
}