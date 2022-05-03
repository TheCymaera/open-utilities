/**
 * A resource that needs to be disposed, such as an event listener.
 * @example
 * const id = setInterval(callback, 1000);
 * return new Disposable(()=>clearInterval(id));
 */
export class Disposable {
	constructor(dispose: (this: Disposable)=>any) {
		this.dispose = dispose;
	}

	dispose(): void {
		// do nothing
	}

	static is(value: any): value is Disposable {
		return value && "dispose" in value;
	}

	static all(...disposables: Disposable[]): Disposable {
		return new Disposable(()=>{
			for (const disposable of disposables) {
				if (Disposable.is(disposable)) disposable.dispose();
			}
		});
	}

	static readonly empty = new Disposable(()=>undefined);
}