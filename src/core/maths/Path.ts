import { Vector2 } from "./Vector2.js";

export class Path {
	origin = new Vector2(0, 0);
	readonly segments: Path.Segment[] =  [];

	setOrigin(origin: Vector2) {
		this.origin = origin;
		return this;
	}

	lineTo(point: Vector2) {
		this.segments.push(new Path.LineTo(point));
		return this;
	}

	close() {
		this.segments.push(new Path.Close());
		return this;
	}
}


export namespace Path {
	export class LineTo {
		constructor(readonly point: Vector2) {}
	}

	export class Close {
		constructor() {}
	}

	export type Segment = LineTo|Close;
}

