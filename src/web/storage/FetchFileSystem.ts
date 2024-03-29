import { FileSystem } from "../../core/storage/FileSystem.js";
import { ReadonlyURI } from "../../core/paths/URI.js";

/**
 * @experimental
 */
export class FetchFileSystem extends FileSystem {
	async readFile(uri: ReadonlyURI) {
		const response = await fetch(uri.toString(), {cache: "reload"});
		if (response.status === 404) throw new Error(`File "${uri.slug()}" not found.`);
		return await response.arrayBuffer();
	}

	async writeFile() {
		throw new Error("Failed to write file:\nFile system is read only.");
	}

	async createDirectory() {
		throw new Error("Failed to create directory:\nFile system is read only.");
	}

}