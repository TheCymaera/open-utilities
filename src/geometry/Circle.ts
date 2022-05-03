import { Vec2 } from "./Vec2.js";

export class Circle {
	center: Vec2;
	radius: number;

	constructor(center: Vec2, radius: number) {
		this.center = center;
		this.radius = radius;
	}

	static readonly zero = Object.freeze(new Circle(Vec2.zero, 0));
}