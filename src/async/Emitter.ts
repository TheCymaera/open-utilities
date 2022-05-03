import { Disposable } from "../core/index.js";

export class Emitter<T> {
	addListener(listener: (value: T)=>any) {
		this.#listeners.add(listener);
		return new Disposable(()=>this.removeListener(listener));
	}

	removeListener(listener: (value: T)=>any) {
		this.#listeners.delete(listener);
	}

	addOnceListener(listener: (value: T)=>any) {
		const onceListener = (value: T)=>{
			this.removeListener(onceListener);
			listener(value);
		};
		return this.addListener(onceListener);
	}


	[Symbol.asyncIterator]() {
		return new Emitter.Queue(this);
	}

	protected Emit(value: T) {
		for (const listener of this.#listeners) listener(value);
	}

	readonly #listeners: Set<(value: T)=>any> = new Set();
}

export namespace Emitter {
	export class Queue<T> implements AsyncIterableIterator<T> {
		readonly onQueueShifted: Emitter<void> = new CustomEmitter;
	
		constructor(stream: Emitter<T>) {
			this.#queue = [];
			this.#stream = stream;
			stream.addListener(value=>this.#queue.push(value));
		}
	
		[Symbol.asyncIterator](): AsyncIterableIterator<T> {
			return this;
		}
	
		isEmpty() {
			return this.#queue.length === 0;
		}
	
		async next(): Promise<IteratorResult<T, any>> {
			if (this.#queue.length === 0) await new Promise(resolve=>this.#stream.addOnceListener(resolve));
			(this.onQueueShifted as CustomEmitter<void>).emit();
			return { done: false, value: this.#queue.shift()! };
		}
	
		readonly #stream: Emitter<T>;
		readonly #queue: T[];
	}
}

export class CustomEmitter<T> extends Emitter<T> {
	emit(value: T) {
		super.Emit(value);
	}
}