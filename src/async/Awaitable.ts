export type Awaitable<T> = T|PromiseLike<T>;
export type AwaitableIterator<T, TReturn, TNext> = Iterator<T, TReturn, TNext>|AsyncIterator<T, TReturn, TNext>;
export type AwaitableIterable<T> = Iterable<T>|AsyncIterable<T>;
export type AwaitableIterableIterator<T> = IterableIterator<T>|AsyncIterableIterator<T>;