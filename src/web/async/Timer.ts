import { Disposable } from "../../core/memory/Disposable.js";
import { Duration } from "../../core/datetime/Duration.js";

/**
 * Timer
 */
export class Timer implements Disposable {
	dispose() {
		clearInterval(this._handle);
	}

	/**
	 * Returns a promise that resolves after a specified duration.
	 * @example
	 * console.log("IE: I'll only take a moment.");
	 * await Timer.delayed(new Duration({hour: 1}));
	 * console.log("IE: Complete!");
	 */
	static schedule(duration: Duration) {
		return new Promise(resolve=>setTimeout(resolve, duration.milliseconds));
	}

	/**
	 * Returns a repeating timer.
	 * @example
	 * Timer.periodic(new Duration({seconds: 1}), ()=>console.log("Tick"));
	 */
	static periodic(duration: Duration, callback: (this: Timer)=>any) {
		return new Timer(setInterval(()=>{
			callback.call(this);
		}, duration.milliseconds));
	}

	private constructor(private readonly _handle: number) {}
}