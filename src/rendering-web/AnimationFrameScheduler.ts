import { Duration, } from "../core/Duration.js";

export class AnimationFrameScheduler {
	private constructor(callback: (elapsedTime: Duration)=>any) {
		this.#callback = callback;
		this.#handle = requestAnimationFrame(this.#onAnimationFrame);
		this.#oldTime = performance.now();
	}

	dispose() {
		cancelAnimationFrame(this.#handle);
	}

	static schedule(): Promise<Duration> {
		const oldTime = performance.now();
		return new Promise(resolve=>requestAnimationFrame(()=>resolve(new Duration({milliseconds: performance.now() - oldTime}))));
	}

	static periodic(callback: (elapsedTime: Duration)=>any) {
		return new AnimationFrameScheduler(callback);
	}

	#onAnimationFrame = () => {
		const oldTime = this.#oldTime;
		this.#oldTime = performance.now();
		this.#callback(new Duration({ milliseconds: this.#oldTime - oldTime }));
		this.#handle = requestAnimationFrame(this.#onAnimationFrame);
	}

	#oldTime: number;
	#handle: number;
	#callback: (elapsedTime: Duration)=>any;
}