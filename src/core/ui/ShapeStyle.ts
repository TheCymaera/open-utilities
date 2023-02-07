import { Color } from "./Color.js";
import { PathStyle } from "./PathStyle.js";

export class ShapeStyle {
	stroke: PathStyle;
	fill: Color;
	constructor({ 
		stroke = new PathStyle(), 
		fill = Color.transparent 
	} = {}) {
		this.stroke = stroke;
		this.fill = fill;
	}
}