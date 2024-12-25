class Color {
    public readonly red: number
    public readonly green: number
    public readonly blue: number
    public readonly alpha: number
    public readonly opacity: number

    constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 255) {
        this.red = Color.clamp(red, 0, 255)
        this.green = Color.clamp(green, 0, 255)
        this.blue = Color.clamp(blue, 0, 255)
        this.alpha = Color.clamp(alpha, 0, 255)
        this.opacity = alpha / 255.0;
    }

    toString(): string {
        const r = this.red.toString(16).padStart(2, "0")
        const g = this.green.toString(16).padStart(2, "0")
        const b = this.blue.toString(16).padStart(2, "0")
        const a = this.alpha.toString(16).padStart(2, "0")

        return `#${r}${g}${b}${a}`
    }

    static fromString(hex: string): Color {
        if (!/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(hex)) {
            throw new Error("Invalid HEX format")
        }

        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) : 255

        return new Color(r, g, b, a)
    }

    private static clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }
}

export default Color