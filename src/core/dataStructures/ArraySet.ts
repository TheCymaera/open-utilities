export class ArraySet<T> implements Set<T> {
	#values: T[];

	constructor(values?: T[]) {
		this.#values = values ? [...values] : [];
	}

	add(value: T): this {
		if (!this.#values.includes(value)) {
			this.#values.push(value);
		}
		return this;
	}
	clear(): void {
		this.#values = [];
	}
	delete(value: T): boolean {
		const index = this.#values.indexOf(value);
		if (index === -1) return false;
		this.#values.splice(index, 1);
		return true;
	}
	forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
		this.#values.forEach(value => callbackfn(value, value, this));
	}
	has(value: T): boolean {
		return this.#values.includes(value);
	}
	get size(): number {
		return this.#values.length;
	}
	entries(): IterableIterator<[T, T]> {
		return this.#values.map(value => [value, value] as [T, T])[Symbol.iterator]();
	}
	keys(): IterableIterator<T> {
		return this.#values[Symbol.iterator]();
	}
	values(): IterableIterator<T> {
		return this.#values[Symbol.iterator]();
	}
	[Symbol.iterator](): IterableIterator<T> {
		return this.#values[Symbol.iterator]();
	}
	[Symbol.toStringTag] = "ArraySet";
}