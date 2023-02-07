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
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	clone() {
		return new Color(this.r, this.g, this.b, this.a);
	}

	toHexString() {
		return "#" + 
		(this.r | 0).toString(16).padStart(2, "0") + 
		(this.g | 0).toString(16).padStart(2, "0") +
		(this.b | 0).toString(16).padStart(2, "0") +
		(this.a | 0).toString(16).padStart(2, "0");
	}

	toString() {
		return this.toHexString();
	}
}