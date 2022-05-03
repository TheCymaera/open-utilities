export class Color {
	r: number;
	g: number;
	b: number;
	a: number;
	static fromRGBA(r: number, g: number, b: number, a: number): Color {
		return new Color(r, g, b, a);
	}

	static readonly black = Object.freeze(new Color(0, 0, 0, 255));
	static readonly white = Object.freeze(new Color(255, 255, 255, 255));
	static readonly transparent = Object.freeze(new Color(0, 0, 0, 0));

	private constructor(r: number, g: number, b: number, a: number) {
		this.r = r | 0;
		this.g = g | 0;
		this.b = b | 0;
		this.a = a | 0;
	}

	toString() {
		return "#" + 
		this.r.toString(16).padStart(2, "0") + 
		this.g.toString(16).padStart(2, "0") +
		this.b.toString(16).padStart(2, "0") +
		this.a.toString(16).padStart(2, "0");
	}
}