import { Vec2 } from "./Vec2.js";

export class Path {
	origin = new Vec2(0, 0);
	readonly segments: Path.Segment[] =  [];

	setOrigin(origin: Vec2) {
		this.origin = origin;
		return this;
	}

	lineTo(point: Vec2) {
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
		constructor(readonly point: Vec2) {}
	}

	export class Close {
		constructor() {}
	}

	export type Segment = LineTo|Close;
}

