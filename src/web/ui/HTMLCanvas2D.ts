import { Circle } from "../../core/maths/Circle.js";
import { Path } from "../../core/maths/Path.js";
import { Color } from "../../core/ui/Color.js";
import { Atlas } from "./Atlas.js";
import { PathStyle } from "../../core/ui/PathStyle.js";
import { ShapeStyle } from "../../core/ui/ShapeStyle.js";
import { Vector3 } from "../../core/maths/Vector3.js";
import { Matrix4 } from "../../core/maths/Matrix4.js";
import { Vector2 } from "../../core/maths/Vector2.js";
import { Rect } from "../../core/maths/Rect.js";


export class HTMLCanvas2D {
	readonly ctx: CanvasRenderingContext2D;
	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
	}

	static fromCanvas(canvas: HTMLCanvasElement): HTMLCanvas2D {
		return new HTMLCanvas2D(canvas.getContext("2d")!);
	}

	static #sampleCache: Record<string, Color> = {};
	static sampleCSSColor(colorString: string) {
		if (this.#sampleCache[colorString] !== undefined) return this.#sampleCache[colorString]!.clone();

		const canvas = document.createElement("canvas")!;
		canvas.width = canvas.height = 1;
		const ctx = canvas.getContext('2d')!;
		ctx.fillStyle = colorString;
		ctx.fillRect(0,0,1,1);
		const result = ctx.getImageData(0, 0, 1, 1).data;

		const color = Color.fromRGBA(result[0]!, result[1]!, result[2]!, result[3]!);
		this.#sampleCache[colorString] = color;
		return color.clone();
	}

	setTransform(transform: Matrix4) {
		this.#transform = transform.clone();
		this.#updateTransform();
	}

	setBitmapDimensions(dimensions: Vector2) {
		const width = dimensions.x, height = dimensions.y;

		this.ctx.canvas.width = width;
		this.ctx.canvas.height = height;
		
		this.#bitmapTransform = Matrix4.identity()
		.scale(new Vector3(width / 2, -height / 2, 1))
		.translate(new Vector3(1,-1,0));
		
		this.#updateTransform();
	}

	getClientInverseTransform() {
		const width = this.ctx.canvas.clientWidth;
		const height = this.ctx.canvas.clientHeight;
		
		const clientTransform = Matrix4.identity()
		.scale(new Vector3(width / 2, -height / 2, 1))
		.translate(new Vector3(1,-1,0));

		return this.#transform.clone().multiply(clientTransform).invert();
	}

	clear() {
		this.ctx.save();
		this.ctx.resetTransform();
		this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
		this.ctx.restore();
	}

	clearRect(rect: Rect) {
		this.ctx.clearRect(rect.x1, rect.y1, rect.width, rect.height);
	}
	
	drawLine(point1: Vector2, point2: Vector2, style: PathStyle) {
		this.#setPathStyle(style);
		this.ctx.beginPath();
		this.ctx.moveTo(point1.x, point1.y);
		this.ctx.lineTo(point2.x, point2.y);
		this.ctx.stroke();
	}

	drawPath(path: Path, style: ShapeStyle) {
		this.#setShapeStyle(style);
		this.#usePath(path);
		if (style.fill.a) this.ctx.fill();
		this.ctx.stroke();
	}

	drawCircle(circle: Circle, style: ShapeStyle) {
		this.#setShapeStyle(style);
		this.ctx.beginPath();
		this.ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
		if (style.fill.a) this.ctx.fill();
		this.ctx.stroke();
	}

	drawRect(rect: Rect, style: ShapeStyle) {
		this.#setShapeStyle(style);
		this.ctx.beginPath();
		this.ctx.rect(rect.x1, rect.y1, rect.width, rect.height);
		if (style.fill.a) this.ctx.fill();
		this.ctx.stroke();
	}

	/**
	 * Use `drawImage` with ImageBitmap instead.
	 * @deprecated 
	 */
	drawAtlas(rect: Rect, atlas: Atlas) {
		const bitmapRect = atlas.bitmapRect;
		this.ctx.drawImage(
			atlas.image, 
			bitmapRect.x1,
			bitmapRect.y1,
			bitmapRect.width,
			bitmapRect.height,
			rect.x1, 
			rect.y1, 
			rect.width,
			rect.height,
		);
	}

	drawImage(rect: Rect, bitmap: CanvasImageSource) {
		this.ctx.drawImage(
			bitmap,
			rect.x1,
			rect.y1,
			rect.width,
			rect.height,
		);
	}

	#usePath(path: Path) {
		this.ctx.beginPath();
		const p = path.origin;
		this.ctx.moveTo(p.x, p.y);
		for (const segment of path.segments) {
			if (segment instanceof Path.LineTo) {
				const p = segment.point;
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
		this.ctx.fillStyle = shapeStyle.fill.toString();
	}

	#transform = Matrix4.identity();
	#bitmapTransform = Matrix4.identity();
	#updateTransform() {
		this.ctx.setTransform(this.#transform.clone().multiply(this.#bitmapTransform));
	}
}

