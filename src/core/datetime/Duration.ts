/**
 * Duration
 */
 export class Duration {
	milliseconds: number;
	constructor({milliseconds = 0, seconds = 0, minutes = 0, hours = 0, days = 0, weeks = 0}) {
		this.milliseconds = (
			milliseconds +
			seconds * Duration.millisecondsPerSecond +
			minutes * Duration.millisecondsPerMinute +
			hours * Duration.millisecondsPerHour +
			days * Duration.millisecondsPerDay +
			weeks * Duration.millisecondsPerWeek
		);
	}

	set seconds(value: number) {
		this.milliseconds = value * Duration.millisecondsPerSecond;
	}

	get seconds() {
		return this.milliseconds / Duration.millisecondsPerSecond;
	}

	set minutes(value: number) {
		this.milliseconds = value * Duration.millisecondsPerMinute;
	}

	get minutes() {
		return this.milliseconds / Duration.millisecondsPerMinute;
	}

	set hours(value: number) {
		this.milliseconds = value * Duration.millisecondsPerHour;
	}

	get hours() {
		return this.milliseconds / Duration.millisecondsPerHour;
	}

	set days(value: number) {
		this.milliseconds = value * Duration.millisecondsPerDay;
	}

	get days() {
		return this.milliseconds / Duration.millisecondsPerDay;
	}

	set weeks(value: number) {
		this.milliseconds = value * Duration.millisecondsPerWeek;
	}

	get weeks() {
		return this.milliseconds / Duration.millisecondsPerWeek;
	}


	get weeksPart() {
		return Math.floor(this.milliseconds / Duration.millisecondsPerWeek);
	}

	get daysPart() {
		return Math.floor(this.milliseconds / Duration.millisecondsPerDay);
	}

	get hoursPart() {
		return Math.floor((this.milliseconds % Duration.millisecondsPerDay) / Duration.millisecondsPerHour);
	}

	get minutesPart() {
		return Math.floor((this.milliseconds % Duration.millisecondsPerHour) / Duration.millisecondsPerMinute);
	}

	get secondsPart() {
		return Math.floor((this.milliseconds % Duration.millisecondsPerMinute) / Duration.millisecondsPerSecond);
	}

	get millisecondsPart() {
		return this.milliseconds % Duration.millisecondsPerSecond;
	}

	clone() {
		return new Duration({ milliseconds: this.milliseconds });
	}

	abs() {
		this.milliseconds = Math.abs(this.milliseconds);
		return this;
	}

	toString() {
		const abs = this.clone().abs();
		return `${this.daysPart}:${abs.hoursPart}:${abs.minutesPart}:${abs.secondsPart}:${abs.millisecondsPart}`;
	}

	static readonly millisecondsPerSecond 		= 1000;
	static readonly millisecondsPerMinute 		= Duration.millisecondsPerSecond * 60;
	static readonly millisecondsPerHour 		= Duration.millisecondsPerMinute * 60;
	static readonly millisecondsPerDay 			= Duration.millisecondsPerHour * 24;
	static readonly millisecondsPerWeek 		= Duration.millisecondsPerDay * 7;
}