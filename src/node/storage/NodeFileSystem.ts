import { ReadonlyURI } from "../../core/paths/URI.js";
import { FileSystem } from "../../core/storage/FileSystem.js";

// @ts-ignore
import { promises as fs } from "fs";

/**
 * @experimental
 */
export class NodeFileSystem extends FileSystem {
	async readFile(uri: ReadonlyURI): Promise<ArrayBuffer> {
		return fs.readFile(this.#filePath(uri));
	}
	
	async writeFile(uri: ReadonlyURI, content: ArrayBuffer): Promise<void> {
		await this.createDirectory(uri.clone().appendString(".")).catch(()=>void 0);
		await fs.writeFile(this.#filePath(uri), new TextDecoder().decode(content));
	}

	async createDirectory(uri: ReadonlyURI): Promise<void> {
		await fs.mkdir(this.#filePath(uri), { recursive: true });
	}

	#filePath(uri: ReadonlyURI) {
		return decodeURI(uri.pathname);
	}
}