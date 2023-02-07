import { Disposable } from "../memory/Disposable.js";
import { Emitter } from "./Emitter.js";

export class CustomEmitter<T> extends Emitter<T> {
	listen(onData: (data: T)=>any) {
		if (this.#subscriptions.includes(onData)) return Disposable.empty;
		
		this.#subscriptions.push(onData);
		return new Disposable(()=>{
			const index = this.#subscriptions.indexOf(onData);
			if (index !== -1) this.#subscriptions.splice(index, 1);
		});
	}

	emit(data: T) {
		for (const subscription of this.#subscriptions) subscription(data);
	}

	readonly #subscriptions: ((value: T)=>any)[] = [];
}