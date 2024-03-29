import { Matrix4 } from "./Matrix4.js";
import { Vector3 } from "./Vector3.js";

export class Vector2 {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	clone() {
		return new Vector2(this.x, this.y);
	}

	length() {
		return (this.x * this.x + this.y * this.y) ** .5;
	}

	isZero() {
		return this.x === 0 && this.y === 0;
	}

	transformMatrix4(transform: Matrix4) {
		const vec3 = new Vector3(this.x, this.y, 0).transformMatrix4(transform);
		this.x = vec3.x;
		this.y = vec3.y;
		return this;
	}

	distanceTo(other: Vector2) {
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return (dx * dx + dy * dy) ** .5;
	}

	angleTo(other: Vector2) {
		const dx = other.x - this.x;
		const dy = other.y - this.y;
		return Math.atan2(dy, dx);
	}

	normalize() {
		const length = this.length();
		if (length == 0) return undefined;
		this.x /= length;
		this.y /= length;
		return this;
	}

	copy(other: Vector2) {
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	add(other: Vector2) {
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	subtract(other: Vector2) {
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	multiply(scale: number) {
		this.x *= scale;
		this.y *= scale;
		return this;
	}

	divide(scale: number) {
		this.x /= scale;
		this.y /= scale;
		return this;
	}

	rotate(angle: number) {
		const cosAngle = Math.cos(angle);
		const sinAngle = Math.sin(angle);
		const x = this.x;
		const y = this.y;
		this.x = x * cosAngle - y * sinAngle;
		this.y = x * sinAngle + y * cosAngle;
		return this;
	}

	lerp(target: Vector2, fraction: number) {
		this.x += (target.x - this.x) * fraction;
		this.y += (target.y - this.y) * fraction;
		return this;
	}

	toString() {
		return `Vec2(${this.x.toFixed(3)}, ${this.y.toFixed(3)})`;
	}

	static readonly zero = Object.freeze(new Vector2(0, 0));

	static fromRotation(angle: number, length = 1) {
		return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length);
	}
}