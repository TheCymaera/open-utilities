import { Color } from "./Color.js";
import { PathStyle } from "./PathStyle.js";

export class ShapeStyle {
	stroke: PathStyle;
	fillColor: Color;
	constructor({ 
		stroke = new PathStyle(), 
		fillColor = Color.transparent 
	} = {}) {
		this.stroke = stroke;
		this.fillColor = fillColor;
	}
}