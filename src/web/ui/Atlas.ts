import { Rect } from "../../core/maths/Rect.js";
/**
 * Use `ImageBitmap`.
 * @deprecated 
 */
export class Atlas {
	private constructor(
		public image: HTMLImageElement | ImageBitmap,
		public rect: Rect,
	) {}

	static fromRect(image: HTMLImageElement, rect: Rect): Atlas {
		return new Atlas(image, rect);
	}

	static fromBitmapRect(image: HTMLImageElement, rect: Rect): Atlas {
		const out = new Atlas(image, rect);
		out.bitmapRect = rect;
		return out;
	}
	
	get bitmapRect(): Rect {
		return Rect.fromCoordinates(
			this.rect.x1 * this.image.width, 
			this.rect.y1 * this.image.height, 
			this.rect.x2 * this.image.width, 
			this.rect.y2 * this.image.height,
		);
	}

	set bitmapRect(value: Rect) {
		this.rect = Rect.fromCoordinates(
			value.x1 / this.image.width, 
			value.y1 / this.image.height, 
			value.x2 / this.image.width, 
			value.y2 / this.image.height,
		);
	}
}