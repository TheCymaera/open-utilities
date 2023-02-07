import { Disposable } from "../memory/Disposable.js";

export abstract class Emitter<T> {
	abstract listen(onData: (data: T)=>any, options?: {onClose?: ()=>any}): Disposable;

	single() {
		return new Promise<T>(resolve=>{
			const subscription = this.listen((data)=>{
				subscription.dispose();
				resolve(data);
			});
		});
	}

	[Symbol.asyncIterator]() {
		return new _StreamIterator(this);
	}
}

class _StreamIterator<T> implements AsyncIterableIterator<T> {
	constructor(emitter: Emitter<T>) {
		this.#queue = [];
		emitter.listen(
			value=>{
				this.#queue.push({done: false, value: value});
				this.onPush();
			},
			{
				onClose: ()=>{
					this.#queue.push({done: true, value: undefined});
					this.onPush();
				}
			}
		);
	}

	[Symbol.asyncIterator](): AsyncIterableIterator<T> {
		return this;
	}

	async next(): Promise<IteratorResult<T, any>> {
		if (this.#queue.length === 0) await new Promise<void>(resolve=>this.onPush = resolve);
		return this.#queue.shift()!;
	}

	readonly #queue: IteratorResult<T>[];
	onPush: ()=>any = ()=>{};
}