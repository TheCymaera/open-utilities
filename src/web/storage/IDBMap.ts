/**
 * A IndexedDB-based Map
 */
export class IDBMap<K extends IDBValidKey,V> {
	private constructor(
		public readonly database: IDBDatabase,
		public storeName : string = "default",
	) { }

	static async create<K extends IDBValidKey,V>(options: IDBMap.CreateOptions): Promise<IDBMap<K,V>> {
		const storeName = options.storeName ?? "IDBMap";

		return new Promise((resolve, reject)=>{
			const request = indexedDB.open(options.name);

			request.onsuccess = ()=>resolve(new IDBMap(request.result, storeName));

			request.onerror = ()=>reject(new IDBMap.ConnectionError(request.error!.message));
			
			request.onupgradeneeded = () => {
				request.result.createObjectStore(storeName, { keyPath:"key" });
			}
		});
	}

	static async delete(name: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.deleteDatabase(name);
			request.onsuccess = ()=>resolve();
			request.onerror = ()=>reject(new IDBMap.ConnectionError(request.error!.message));
		});
	}

	async get(key : K): Promise<V|undefined> {
		const store = this.#getStore("readonly");
		const response = await this.#processRequest(store.get(key));
		return response?.value;
	}

	async set(key : K,value : V) : Promise<void> {
		const store = this.#getStore("readwrite");
		await this.#processRequest(store.put({key: key, value: value}));
	}

	async delete(key : K): Promise<void> {
		const store = this.#getStore("readwrite");
		return this.#processRequest(store.delete(key));
	}

	async clear(): Promise<void> {
		const store = this.#getStore("readwrite");
		return this.#processRequest(store.clear());
	}

	async *entries(): AsyncIterableIterator<[K, V]> {
		const store = this.#getStore("readonly");
		const cursor = store.openCursor();
		while (true) {
			await new Promise(resolve=>cursor.onsuccess = resolve);
			if (!cursor.result) return;

			const entry = cursor.result.value;
			yield [entry.key, entry.value];

			cursor.result.continue();
		}
	}

	#getStore(mode : IDBTransactionMode) {
		const transaction = this.database.transaction(this.storeName, mode);
		return transaction.objectStore(this.storeName);
	}
	
	async #processRequest<T>(request : IDBRequest<T>) : Promise<T> {
		return new Promise((resolve,reject)=>{
			request.onsuccess = ()=>resolve(request.result);
			request.onerror   = ()=>reject(new IDBMap.RequestError(request.error!.toString()));
		});
	}
}

export namespace IDBMap {
	export interface CreateOptions {
		name: string;
		storeName?: string;
	}

	export class ConnectionError extends Error {
		constructor(reason : string) { super("IDBMap - Connection error:\n" + reason); }
	}
	
	export class RequestError extends Error {
		constructor(reason : string) { super("IDBMap - Request error:\n" + reason); }
	}
	
}