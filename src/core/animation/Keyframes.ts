export class Keyframes<T> {
	#frames: Keyframes.Frame<T>[];
	#totalLength: number;
	#currentTime = 0;

	constructor(frames: Keyframes.Frame<T>[]) {
		if (frames.length === 0) {
			throw new Error('Keyframes must have at least one frame');
		}
		
		this.#frames = frames;
		this.#totalLength = frames.reduce((total, frame) => total + frame.duration, 0);
	}

	step(deltaTime: number) {
		this.#currentTime += deltaTime;
	}

	stepAndLoop(deltaTime: number) {
		this.#currentTime += deltaTime;
		this.#currentTime = this.#currentTime % this.#totalLength;
	}

	getCurrentFrame(): T {
		let time = 0;
			for (const frame of this.#frames) {
				time += frame.duration;
				if (time >= this.#currentTime) return frame.value;
			}
			return this.#frames.at(-1)!.value;
	}
}

export namespace Keyframes {
	export interface Frame<T> {
		duration: number;
		value: T;
	}

	export interface InterpolatedFrame<T> {
		value1: T;
		value2: T;
		lerp: number;
	}
}