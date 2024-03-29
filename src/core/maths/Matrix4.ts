import { Rect } from "./Rect.js";
import { Vector3 } from "./Vector3.js";

export class Matrix4 {
	private constructor(
		public m11: number, public m12: number, public m13: number, public m14: number, 
		public m21: number, public m22: number, public m23: number, public m24: number, 
		public m31: number, public m32: number, public m33: number, public m34: number, 
		public m41: number, public m42: number, public m43: number, public m44: number,
	) { }

	clone() {
		return new Matrix4(
			this.m11,
			this.m12,
			this.m13,
			this.m14,
			this.m21,
			this.m22,
			this.m23,
			this.m24,
			this.m31,
			this.m32,
			this.m33,
			this.m34,
			this.m41,
			this.m42,
			this.m43,
			this.m44,
		);
	}

	copy(other: Matrix4) {
		return this.set(
			other.m11,
			other.m12,
			other.m13,
			other.m14,
			other.m21,
			other.m22,
			other.m23,
			other.m24,
			other.m31,
			other.m32,
			other.m33,
			other.m34,
			other.m41,
			other.m42,
			other.m43,
			other.m44,
		);
	}

	set(
		m11: number, m12: number, m13: number, m14: number, 
		m21: number, m22: number, m23: number, m24: number, 
		m31: number, m32: number, m33: number, m34: number, 
		m41: number, m42: number, m43: number, m44: number,
	) {
		this.m11 = m11;
		this.m12 = m12;
		this.m13 = m13;
		this.m14 = m14;
		this.m21 = m21;
		this.m22 = m22;
		this.m23 = m23;
		this.m24 = m24;
		this.m31 = m31;
		this.m32 = m32;
		this.m33 = m33;
		this.m34 = m34;
		this.m41 = m41;
		this.m42 = m42;
		this.m43 = m43;
		this.m44 = m44;
		return this;
	}

	identity() {
		return this.set(
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			0,0,0,1,
		);
	}

	isEqual(other: Matrix4) {
		return (
			this.m11 === other.m11 &&
			this.m12 === other.m12 &&
			this.m13 === other.m13 &&
			this.m14 === other.m14 &&
			this.m21 === other.m21 &&
			this.m22 === other.m22 &&
			this.m23 === other.m23 &&
			this.m24 === other.m24 &&
			this.m31 === other.m31 &&
			this.m32 === other.m32 &&
			this.m33 === other.m33 &&
			this.m34 === other.m34 &&
			this.m41 === other.m41 &&
			this.m42 === other.m42 &&
			this.m43 === other.m43 &&
			this.m44 === other.m44
		);
	}

	invert() {
		const a11 = this.m11;
		const a12 = this.m12;
		const a13 = this.m13;
		const a14 = this.m14;
		const a21 = this.m21;
		const a22 = this.m22;
		const a23 = this.m23;
		const a24 = this.m24;
		const a31 = this.m31;
		const a32 = this.m32;
		const a33 = this.m33;
		const a34 = this.m34;
		const a41 = this.m41;
		const a42 = this.m42;
		const a43 = this.m43;
		const a44 = this.m44;

		const b00 = a11 * a22 - a12 * a21;
		const b01 = a11 * a23 - a13 * a21;
		const b02 = a11 * a24 - a14 * a21;
		const b03 = a12 * a23 - a13 * a22;
		const b04 = a12 * a24 - a14 * a22;
		const b05 = a13 * a24 - a14 * a23;
		const b06 = a31 * a42 - a32 * a41;
		const b07 = a31 * a43 - a33 * a41;
		const b08 = a31 * a44 - a34 * a41;
		const b09 = a32 * a43 - a33 * a42;
		const b10 = a32 * a44 - a34 * a42;
		const b11 = a33 * a44 - a34 * a43;
		
		// Calculate the determinant
		let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
		if (!det) return this;
		
		det = 1.0 / det;
		this.m11 = (a22 * b11 - a23 * b10 + a24 * b09) * det;
		this.m12 = (a13 * b10 - a12 * b11 - a14 * b09) * det;
		this.m13 = (a42 * b05 - a43 * b04 + a44 * b03) * det;
		this.m14 = (a33 * b04 - a32 * b05 - a34 * b03) * det;
		this.m21 = (a23 * b08 - a21 * b11 - a24 * b07) * det;
		this.m22 = (a11 * b11 - a13 * b08 + a14 * b07) * det;
		this.m23 = (a43 * b02 - a41 * b05 - a44 * b01) * det;
		this.m24 = (a31 * b05 - a33 * b02 + a34 * b01) * det;
		this.m31 = (a21 * b10 - a22 * b08 + a24 * b06) * det;
		this.m32 = (a12 * b08 - a11 * b10 - a14 * b06) * det;
		this.m33 = (a41 * b04 - a42 * b02 + a44 * b00) * det;
		this.m34 = (a32 * b02 - a31 * b04 - a34 * b00) * det;
		this.m41 = (a22 * b07 - a21 * b09 - a23 * b06) * det;
		this.m42 = (a11 * b09 - a12 * b07 + a13 * b06) * det;
		this.m43 = (a42 * b01 - a41 * b03 - a43 * b00) * det;
		this.m44 = (a31 * b03 - a32 * b01 + a33 * b00) * det;
		
		return this;
	}

	multiply(other: Matrix4) {
		return this.multiplyFrom(this, other);
	}

	multiplyFrom(a: Matrix4, b: Matrix4) {
		return this.set(
			(a.m11 * b.m11) + (a.m12 * b.m21) + (a.m13 * b.m31) + (a.m14 * b.m41),
			(a.m11 * b.m12) + (a.m12 * b.m22) + (a.m13 * b.m32) + (a.m14 * b.m42),
			(a.m11 * b.m13) + (a.m12 * b.m23) + (a.m13 * b.m33) + (a.m14 * b.m43),
			(a.m11 * b.m14) + (a.m12 * b.m24) + (a.m13 * b.m34) + (a.m14 * b.m44),

			(a.m21 * b.m11) + (a.m22 * b.m21) + (a.m23 * b.m31) + (a.m24 * b.m41),
			(a.m21 * b.m12) + (a.m22 * b.m22) + (a.m23 * b.m32) + (a.m24 * b.m42),
			(a.m21 * b.m13) + (a.m22 * b.m23) + (a.m23 * b.m33) + (a.m24 * b.m43),
			(a.m21 * b.m14) + (a.m22 * b.m24) + (a.m23 * b.m34) + (a.m24 * b.m44),

			(a.m31 * b.m11) + (a.m32 * b.m21) + (a.m33 * b.m31) + (a.m34 * b.m41),
			(a.m31 * b.m12) + (a.m32 * b.m22) + (a.m33 * b.m32) + (a.m34 * b.m42),
			(a.m31 * b.m13) + (a.m32 * b.m23) + (a.m33 * b.m33) + (a.m34 * b.m43),
			(a.m31 * b.m14) + (a.m32 * b.m24) + (a.m33 * b.m34) + (a.m34 * b.m44),

			(a.m41 * b.m11) + (a.m42 * b.m21) + (a.m43 * b.m31) + (a.m44 * b.m41),
			(a.m41 * b.m12) + (a.m42 * b.m22) + (a.m43 * b.m32) + (a.m44 * b.m42),
			(a.m41 * b.m13) + (a.m42 * b.m23) + (a.m43 * b.m33) + (a.m44 * b.m43),
			(a.m41 * b.m14) + (a.m42 * b.m24) + (a.m43 * b.m34) + (a.m44 * b.m44),
		);
	}

	translate(translation: Vector3) {
		const {x,y,z} = translation;
		this.m41 = this.m11 * x + this.m21 * y + this.m31 * z + this.m41;
		this.m42 = this.m12 * x + this.m22 * y + this.m32 * z + this.m42;
		this.m43 = this.m13 * x + this.m23 * y + this.m33 * z + this.m43;
		this.m44 = this.m14 * x + this.m24 * y + this.m34 * z + this.m44;
		return this;
	}

	scale(scale: Vector3) {
		const {x,y,z} = scale;
		this.m11 *= x;
		this.m12 *= x;
		this.m13 *= x;
		this.m14 *= x;
		this.m21 *= y;
		this.m22 *= y;
		this.m23 *= y;
		this.m24 *= y;
		this.m31 *= z;
		this.m32 *= z;
		this.m33 *= z;
		this.m34 *= z;
		return this;
	}

	lookAt(eye: Vector3, center: Vector3, up: Vector3) {
		let x0: number, x1: number, x2: number; 
		let y0: number, y1: number, y2: number; 
		let z0: number, z1: number, z2: number;

		let len: number;
		const eyeX = eye.x;
		const eyeY = eye.y;
		const eyeZ = eye.z;
		const upX = up.x;
		const upY = up.y;
		const upZ = up.z;
		const centerX = center.x;
		const centerY = center.y;
		const centerZ = center.z;

		if (
			Math.abs(eyeX - centerX) < .00001 &&
			Math.abs(eyeY - centerY) < .00001 &&
			Math.abs(eyeZ - centerZ) < .00001
		) {
			return this.identity();
		}

		z0 = eyeX - centerX;
		z1 = eyeY - centerY;
		z2 = eyeZ - centerZ;
		len = 1 / Math.hypot(z0, z1, z2);
		z0 *= len;
		z1 *= len;
		z2 *= len;
		x0 = upY * z2 - upZ * z1;
		x1 = upZ * z0 - upX * z2;
		x2 = upX * z1 - upY * z0;
		len = Math.hypot(x0, x1, x2);
		if (!len) {
			x0 = 0;
			x1 = 0;
			x2 = 0;
		} else {
			len = 1 / len;
			x0 *= len;
			x1 *= len;
			x2 *= len;
		}
		y0 = z1 * x2 - z2 * x1;
		y1 = z2 * x0 - z0 * x2;
		y2 = z0 * x1 - z1 * x0;
		len = Math.hypot(y0, y1, y2);
		if (!len) {
			y0 = 0;
			y1 = 0;
			y2 = 0;
		} else {
			len = 1 / len;
			y0 *= len;
			y1 *= len;
			y2 *= len;
		}

		return this.set(
			x0, y0, z0, 0,
			x1, y1, z1, 0,
			x2, y2, z2, 0,

			-(x0 * eyeX + x1 * eyeY + x2 * eyeZ),
			-(y0 * eyeX + y1 * eyeY + y2 * eyeZ),
			-(z0 * eyeX + z1 * eyeY + z2 * eyeZ),
			1,
		);
	}

	perspective(fovy: number, aspect: number, near: number, far?: number) {
		const f = 1.0 / Math.tan(fovy / 2);
		
		this.m11 = f / aspect;
		this.m12 = 0;
		this.m13 = 0;
		this.m14 = 0;
		
		this.m21 = 0;
		this.m22 = f;
		this.m23 = 0;
		this.m24 = 0;

		this.m31 = 0;
		this.m32 = 0;
		//  .m33
		this.m34 = -1;
		
		this.m41 = 0;
		this.m42 = 0;
		//  .m43
		this.m44 = 0;

		if (far !== undefined && far !== Infinity) {
			const nf = 1 / (near - far);
			this.m33 = (far + near) * nf;
			this.m43 = 2 * far * near * nf;
		} else {
			this.m33 = -1;
			this.m43 = -2 * near;
		}
		return this;
	}

	rotateX(radians: number) {
		this.multiply(Matrix4.rotationX(radians));
		return this;
	}

	rotateY(radians: number) {
		this.multiply(Matrix4.rotationY(radians));
		return this;
	}

	rotateZ(radians: number) {
		this.multiply(Matrix4.rotationZ(radians));
		return this;
	}

	static identity() {
		return new Matrix4(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		);
	}

	static ortho(rect: Rect, near: number = -1, far: number = 1) {
		const left = rect.x1;
		const right = rect.x2;
		const bottom = rect.y1;
		const top = rect.y2;
		
		const lr = 1 / (left - right);
		const bt = 1 / (bottom - top);
		const nf = 1 / (near - far);

		return new Matrix4(
			-2 * lr,
			0,
			0,
			0,
			0,
			-2 * bt,
			0,
			0,
			0,
			0,
			2 * nf,
			0,
			(left + right) * lr,
			(top + bottom) * bt,
			(far + near) * nf,
			1,
		);
	}

	static translation(x: number, y: number, z: number) {
		return new Matrix4(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			x, y, z, 1
		);
	}

	static rotationX(radians: number) {
		const c = Math.cos(radians), s = Math.sin(radians);

		return new Matrix4(
			1, 0, 0, 0,
			0, c, s, 0,
			0, - s, c, 0,
			0, 0, 0, 1
		);
	}

	static rotationY(radians: number) {
		const c = Math.cos(radians), s = Math.sin(radians);

		return new Matrix4(
			 c, 0, - s, 0,
			 0, 1, 0, 0,
			 s, 0, c, 0,
			 0, 0, 0, 1
		);
	}

	static rotationZ(radians: number) {
		const c = Math.cos(radians), s = Math.sin(radians);

		return new Matrix4(
			c, s, 0, 0,
			- s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		);
	}

	static rotationAxis(radians: number, axis: Vector3): Matrix4|undefined {
		let len = axis.length();
		if (!len) return undefined;

		const iLen = 1 / len;
		const x = axis.x * iLen;
		const y = axis.y * iLen;
		const z = axis.z * iLen;

		const s = Math.sin(radians);
		const c = Math.cos(radians);
		const t = 1 - c;
		
		return new Matrix4(
			x * x * t + c,
			y * x * t + z * s,
			z * x * t - y * s,
			0,

			x * y * t - z * s,
			y * y * t + c,
			z * y * t + x * s,
			0,

			x * z * t + y * s,
			y * z * t - x * s,
			z * z * t + c,
			0,

			0,
			0,
			0,
			1,
		);
	}
}