export {}
/*
import { Duration } from "./Duration.js";

export class DateTime {
	epochMilliseconds: number;

	get epochSeconds() {
		return this.epochMilliseconds / Duration.millisecondsPerSecond;
	}

	set epochSeconds(value: number) {
		this.epochMilliseconds = value * Duration.millisecondsPerSecond;
	}

	add(duration: Duration) {
		this.epochMilliseconds += duration.milliseconds;
		return this;
	}

	subtract(dateTime: DateTime) {
		return new Duration({ milliseconds: this.epochMilliseconds - dateTime.epochMilliseconds });
	}

	toLocaleString() {
		return new Date(this.epochMilliseconds).toLocaleString();
	}

	toISOString() {
		return new Date(this.epochMilliseconds).toISOString();
	}

	toString() {
		return this.toLocaleString();
	}

	static now() {
		return new DateTime(Date.now());
	}

	static fromEpochMilliseconds(epochMilliseconds: number) {
		return new DateTime(epochMilliseconds);
	}

	static fromEpochSeconds(epochSeconds: number) {
		return new DateTime(epochSeconds * Duration.millisecondsPerSecond);
	}
	
	private constructor(epochMilliseconds: number) {
		this.epochMilliseconds = epochMilliseconds;
	}
}*/