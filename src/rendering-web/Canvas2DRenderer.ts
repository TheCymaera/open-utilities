import { Circle } from "../geometry/Circle.js";
import { Vec2, Rect } from "../geometry/index.js";
import { Path } from "../geometry/Path.js";
import { Color, Sprite } from "../ui/index.js";
import { PathStyle } from "../ui/PathStyle.js";
import { ShapeStyle } from "../ui/ShapeStyle.js";


export class Canvas2DRenderer {
	readonly ctx: CanvasRenderingContext2D;
	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
	}

	static fromCanvas(canvas: HTMLCanvasElement): Canvas2DRenderer {
		return new Canvas2DRenderer(canvas.getContext("2d")!);
	}

	static sampleCSSColor(color: string) {
		const canvas = document.createElement("canvas")!;
		canvas.width = canvas.height = 1;
		const ctx = canvas.getContext('2d')!;
		ctx.fillStyle = color;
		ctx.fillRect(0,0,1,1);
		const result = ctx.getImageData(0, 0, 1, 1).data;
		return Color.fromRGBA(result[0]!, result[1]!, result[2]!, result[3]!);
	}

	viewportRect(): Rect {
		return this.#viewportRect;
	}

	setViewportRect(viewRect: Rect) {
		this.#viewportRect = viewRect;
	}

	clientRect(): Rect {
		return Rect.fromCoordinates(0, this.ctx.canvas.clientHeight, this.ctx.canvas.clientWidth, 0);
	}

	bitmapRect(): Rect {
		return Rect.fromCoordinates(0, this.ctx.canvas.height, this.ctx.canvas.width, 0);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}
	
	drawLine(point1: Vec2, point2: Vec2, style: PathStyle) {
		const p1 = Rect.mapPointOnto(this.#viewportRect, point1, this.bitmapRect());
		const p2 = Rect.mapPointOnto(this.#viewportRect, point2, this.bitmapRect());

		this.#setPathStyle(style);
		this.ctx.beginPath();
		this.ctx.moveTo(p1.x, p1.y);
		this.ctx.lineTo(p2.x, p2.y);
		this.ctx.stroke();
	}

	drawPath(path: Path, style: PathStyle) {
		this.#setPathStyle(style);
		this.#usePath(path);
		this.ctx.stroke();
	}

	drawCircle(circle: Circle, style: ShapeStyle) {
		const center = Rect.mapPointOnto(this.#viewportRect, circle.center, this.bitmapRect());
		const radius = circle.radius * this.ctx.canvas.width / this.#viewportRect.width;

		this.#setShapeStyle(style);
		this.ctx.beginPath();
		this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
		this.ctx.fill();
		this.ctx.stroke();
	}

	drawRect(rect: Rect, style: ShapeStyle) {
		const mappedRect = Rect.mapRectOnto(this.#viewportRect, rect, this.bitmapRect());

		this.#setShapeStyle(style);
		this.ctx.beginPath();
		this.ctx.rect(mappedRect.x1, mappedRect.y1, mappedRect.width, mappedRect.height);
		this.ctx.fill();
		this.ctx.stroke();
	}

	drawSprite(rect: Rect, sprite: Sprite) {
		const mappedRect = Rect.mapRectOnto(this.#viewportRect, rect, this.bitmapRect());
		const bitmapRect = sprite.bitmapRect;
		this.ctx.drawImage(
			sprite.image, 
			bitmapRect.x1,
			bitmapRect.y1,
			bitmapRect.width,
			bitmapRect.height,
			mappedRect.x1, 
			mappedRect.y1, 
			mappedRect.width,
			mappedRect.height,
		);
	}

	#viewportRect = Rect.zero;

	#usePath(path: Path) {
		this.ctx.beginPath();
		const p = Rect.mapPointOnto(this.#viewportRect, path.origin, this.bitmapRect());
		this.ctx.moveTo(p.x, p.y);
		for (const segment of path.segments) {
			if (segment instanceof Path.LineTo) {
				const p = Rect.mapPointOnto(this.#viewportRect, segment.point, this.bitmapRect());
				this.ctx.lineTo(p.x, p.y);
			}

			if (segment instanceof Path.Close) {
				this.ctx.closePath();
			}
		}
	}

	#setPathStyle(pathStyle: PathStyle) {
		this.ctx.lineWidth = pathStyle.width;
		this.ctx.strokeStyle = pathStyle.color.toString();
		this.ctx.miterLimit = pathStyle.miterLimit;

		switch (pathStyle.cap) {
			case PathStyle.Cap.Butt: this.ctx.lineCap = "butt"; break;
			case PathStyle.Cap.Round: this.ctx.lineCap = "round"; break;
			case PathStyle.Cap.Square: this.ctx.lineCap = "square"; break;
		}

		switch (pathStyle.join) {
			case PathStyle.Join.Miter: this.ctx.lineJoin = "miter"; break;
			case PathStyle.Join.Round: this.ctx.lineJoin = "round"; break;
			case PathStyle.Join.Bevel: this.ctx.lineJoin = "bevel"; break;
		}
	}

	#setShapeStyle(shapeStyle: ShapeStyle) {
		this.#setPathStyle(shapeStyle.stroke);
		this.ctx.fillStyle = shapeStyle.fillColor.toString();
	}
}

