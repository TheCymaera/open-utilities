import { ReadonlyURI } from "../paths/URI.js";

/**
 * @experimental
 */
export abstract class FileSystem {
	abstract readFile(uri: ReadonlyURI): Promise<ArrayBuffer>;
	abstract writeFile(uri: ReadonlyURI, content: ArrayBuffer): Promise<void>;

	abstract createDirectory(uri: ReadonlyURI): Promise<void>;

	async readTextFile(uri: ReadonlyURI): Promise<string> {
		const arrayBuffer = await this.readFile(uri);
		return new TextDecoder().decode(arrayBuffer);
	}
	async writeTextFile(uri: ReadonlyURI, content: string): Promise<void> {
		const arrayBuffer = new TextEncoder().encode(content);
		return await this.writeFile(uri, arrayBuffer);
	}
}

interface TextEncoder {
	encode(input?: string): Uint8Array;
}

declare var TextEncoder: {
	prototype: TextEncoder;
	new(): TextEncoder;
};

interface TextDecoder {
	decode(input?: ArrayBuffer): string;
}

declare var TextDecoder: {
	prototype: TextDecoder;
	new(): TextDecoder;
};