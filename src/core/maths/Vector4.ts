import { Matrix4 } from "./Matrix4.js";

export class Vector4 {
	x: number;
	y: number;
	z: number;
	w: number;
	constructor(x: number, y: number, z: number, w: number) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	clone() {
		return new Vector4(this.x, this.y, this.z, this.w);
	}

	transformMatrix4(transform: Matrix4) {
		const { x, y, z, w } = this;
		const m = transform;
		this.x = m.m11 * x + m.m21 * y + m.m31 * z + m.m41 * w;
		this.y = m.m12 * x + m.m22 * y + m.m32 * z + m.m42 * w;
		this.z = m.m13 * x + m.m23 * y + m.m33 * z + m.m43 * w;
		this.w = m.m14 * x + m.m24 * y + m.m34 * z + m.m44 * w;
		return this;
	}

	toArray() {
		return [this.x, this.y, this.z, this.w] as const;
	}

	toString() {
		return `Vec4(${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)}, ${this.w.toFixed(3)})`;
	}
}