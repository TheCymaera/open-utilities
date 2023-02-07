import { Matrix4 } from "./dst/maths/Matrix4.js";
import { Vector3 } from "./dst/maths/Vector3.js";

console.log(
	Matrix4.identity().rotateX(1)
)

console.log(
	Matrix4.identity().multiply(Matrix4.rotationAxis(1, new Vector3(1, 0, 0)))
)