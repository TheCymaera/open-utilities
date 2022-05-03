import { Rect } from "../geometry/index.js";

export class Sprite {
	image: HTMLImageElement;
	rect: Rect;

	static fromRect(image: HTMLImageElement, rect: Rect): Sprite {
		const out = new Sprite();
		out.image = image;
		out.rect = rect;
		return out;
	}

	static fromBitmapRect(image: HTMLImageElement, rect: Rect): Sprite {
		const out = new Sprite();
		out.image = image;
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