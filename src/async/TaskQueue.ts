import { Disposable } from "../core/Disposable.js";
import { Awaitable } from "./Awaitable.js";

export class TaskQueue {
	maxConcurrent = 1;

	push(task: TaskQueue.Task): Disposable {
		this.#queue.push(task);
		this.#onChange();
		return new Disposable(()=>this.delete(task));
	}

	delete(task: TaskQueue.Task) {
		for (let i = 0; i < this.#queue.length; i++) {
			if (this.#queue[i] === task) {
				this.#queue.splice(i, 1);
				this.#onChange();
				return;
			}
		}
	}

	clear() {
		this.#queue.length = 0;
		this.#onChange();
	}

	pause() {
		this.#isPaused = true;
	}

	unpause() {
		this.#isPaused = false;
		this.#onChange();
	}

	async #onChange() {
		if (this.#isPaused) return;
		if (this.#running > this.maxConcurrent) return;
		if (this.#queue.length === 0) return;
		
		this.#running += 1;

		try {
			await this.#queue[0]!();
		} catch(e) {}

		this.#running -= 1;

		this.#queue.shift();
		this.#onChange();
	}

	#isPaused = false;
	#running = 0;
	#queue: TaskQueue.Task[] = [];
}

export namespace TaskQueue {
	export type Task = ()=>Awaitable<any>;
}