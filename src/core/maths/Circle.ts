import { Vector2 } from "./Vector2.js";

export class Circle {
	center: Vector2;
	radius: number;

	constructor(center: Vector2, radius: number) {
		this.center = center;
		this.radius = radius;
	}

	static readonly zero = Object.freeze(new Circle(Vector2.zero, 0));
}