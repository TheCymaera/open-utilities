import { Vec2 } from './Vec2';

export class Rect {
	private constructor(
		public x1: number,
		public y1: number,
		public x2: number,
		public y2: number,
	) {}

	static readonly zero = Object.freeze(new Rect(0, 0, 0, 0));

	static fromPoints(p1: Vec2, p2: Vec2) {
		return new Rect(p1.x, p1.y, p2.x, p2.y);
	}

	static fromCenter(center: Vec2, xSize: number, ySize: number) {
		const x1 = center.x - xSize / 2;
		const y1 = center.y - ySize / 2;
		return new Rect(x1, y1, x1 + xSize, y1 + ySize);
	}

	static fromDimensions(x: number, y: number, width: number, height: number) {
		return new Rect(x, y, x + width, y + height);
	}

	static fromCoordinates(x1: number, y1: number, x2: number, y2: number) {
		return new Rect(x1, y1, x2, y2);
	}

	get width() {
		return this.x2 - this.x1;
	}

	get height() {
		return this.y2 - this.y1;
	}

	set width(value: number) {
		this.x2 = this.x1 + value;
	}

	set height(value: number) {
		this.y2 = this.y1 + value;
	}

	get center() {
		return new Vec2(
			(this.x1 + this.x2) / 2,
			(this.y1 + this.y2) / 2
		);
	}

	set center(value: Vec2) {
		const width = this.width;
		const height = this.height;
		
		this.x1 = value.x - width / 2;
		this.y1 = value.y - height / 2;
		this.x2 = value.x + width / 2;
		this.y2 = value.y + height / 2;
	}

	get minX() {
		return Math.min(this.x1, this.x2);
	}

	get minY() {
		return Math.min(this.y1, this.y2);
	}

	get maxX() {
		return Math.max(this.x1, this.x2);
	}

	get maxY() {
		return Math.max(this.y1, this.y2);
	}

	toString() {
		return `Rect(${this.x1.toFixed(3)}, ${this.y1.toFixed(3)}, ${this.width.toFixed(3)}, ${this.height.toFixed(3)})`;
	}

	static mapPointOnto(i: Rect, point: Vec2, o: Rect) {
		const x = (point.x - i.x1) / (i.x2 - i.x1) * (o.x2 - o.x1) + o.x1;
		const y = (point.y - i.y1) / (i.y2 - i.y1) * (o.y2 - o.y1) + o.y1;
		return new Vec2(x, y);
	}

	static mapRectOnto(i: Rect, r: Rect, o: Rect) {
		return Rect.fromPoints(
			Rect.mapPointOnto(i, new Vec2(r.x1, r.y1), o), 
			Rect.mapPointOnto(i, new Vec2(r.x2, r.y2), o),
		);
	}
}

