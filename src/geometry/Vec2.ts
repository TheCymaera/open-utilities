export class Vec2 {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	clone() {
		return new Vec2(this.x, this.y);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	distanceTo(other: Vec2) {
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	angleTo(other: Vec2) {
		const dx = other.x - this.x;
		const dy = other.y - this.y;
		return Math.atan2(dy, dx);
	}

	normalize() {
		const length = this.length();
		if (length > 0) {
			this.x /= length;
			this.y /= length;
		}
		return this;
	}

	copy(other: Vec2) {
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	add(other: Vec2) {
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	subtract(other: Vec2) {
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	multiply(scale: number) {
		this.x *= scale;
		this.y *= scale;
		return this;
	}

	rotate(angle: number) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const x = this.x;
		const y = this.y;
		this.x = x * cos - y * sin;
		this.y = x * sin + y * cos;
		return this;
	}

	toString() {
		return `Vec2(${this.x.toFixed(3)}, ${this.y.toFixed(3)})`;
	}

	static readonly zero = Object.freeze(new Vec2(0, 0));
}