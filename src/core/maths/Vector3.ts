import { Matrix4 } from "./Matrix4.js";

export class Vector3 {
	x: number;
	y: number;
	z: number;
	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	clone() {
		return new Vector3(this.x, this.y, this.z);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	transformMatrix4(transform: Matrix4) {
		const m = transform;
		const { x, y, z } = this;
		const w = (m.m14 * x + m.m24 * y + m.m34 * z + m.m44) || 1;

		this.x = (m.m11 * x + m.m21 * y + m.m31 * z + m.m41) / w;
		this.y = (m.m12 * x + m.m22 * y + m.m32 * z + m.m42) / w;
		this.z = (m.m13 * x + m.m23 * y + m.m33 * z + m.m43) / w;
		return this;
	}

	add(other: Vector3) {
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
		return this;
	}

	subtract(other: Vector3) {
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
		return this;
	}

	rotateX(angle: number) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const y = this.y;
		const z = this.z;
		this.y = y * cos - z * sin;
		this.z = y * sin + z * cos;
		return this;
	}

	rotateY(angle: number) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const x = this.x;
		const z = this.z;
		this.x = z * sin + x * cos;
		this.z = z * cos - x * sin;
		return this;
	}

	rotateZ(angle: number) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const x = this.x;
		const y = this.y;
		this.x = x * cos - y * sin;
		this.y = x * sin + y * cos;
		return this;
	}

	toString() {
		return `Vec3(${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)})`;
	}

	static readonly zero = Object.freeze(new Vector3(0, 0, 0));
}