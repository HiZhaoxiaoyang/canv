const { hypot, tan, atan2, sin, cos, acos, PI } = Math

export class Vec3D extends Array {
    constructor(x=1, y=0, z=0) {
        super(x, y, z)
    }

    /**
     * @param {number} x
     */
    set x(x) {
        this[0] = x
    }

    get x() {
        return this[0]
    }

    /**
     * @param {number} y
     */
    set y(y) {
        this[1] = y
    }

    get y() {
        return this[1]
    }

    /**
     * @param {number} z
     */
    set z(z) {
        this[2] = z
    }

    get z() {
        return this[2]
    }

    /**
     * Begin of angle,radians,sin/cos/tan..
     */
    // 求弧度
    rad() {
        return atan2(this.y, this.x)
    }
    // 角度转弧度
    angleToRad(angle) {
        return angle * PI / 180
    }
    // 弧度转角度
    radToAngle(rd) {
        return rd * 180 / PI
    }
    // 角度转正弦
    angleToSin(angle) {
        return sin(this.angleToRad(angle))
    }

    angleToCos(angle) {
        return cos(this.angleToRad(angle))
    }

    angleToTan(angle) {
        return tan(this.angleToRad(angle))
    }

    vecToAngle() {
        return this.radToAngle(this.rad())
    }
    /** end of angle,radians,sin/cos/tan.. */

    
    add(v) {
        this.x += v.x
        this.y += v.y
        this.z += v.z
        return this
    }

    addNew(v) {
        return new this.constructor(this.x + v.x, this.y + v.y, this.z + v.z )
    }

    sub(v) {
        this.x -= v.x
        this.y -= v.y
        this.z -= v.z
        return this
    }

    subNew(v) {
        return new this.constructor( this.x - v.x, this.y - v.y, this.z - v.z )
    }

    negate() {
        this.x = -this.x
        this.y = -this.y
        this.z = -this.z
        return this
    }

    negateNew(v) {
        return new this.constructor(-this.x, -this.y, -this.z)
    }

    scale(s) {
        this.x *= s
        this.y *= s
        this.z *= s
        return this
    }

    scaleNew(v) {
        return new this.constructor( this.x * s, this.y * s, this.z * s )
    }

    reset() {
        return this.constructor(this.x, this.y, this.z)
    }

    clone() {
        // return new this.constructor(this.x, this.y)
        return new Vec3D(this.x, this.y, this.z)
    }

    equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z
    }

    vlength() {
        return hypot(this.x, this.y ,this.z)
    }

    setLength(len) {
        const r = this.vlength()
        r && this.scale(len / r) || (this.x = len)
    }

    getAngle() {
        return this.vecToAngle()
    }

    setAngle(angle) {
        const r = this.vlength()
        this.x = r * cos(this.angleToRad(angle))
        this.y = r * sin(this.angleToRad(angle))
        this.z = r * tan(this.angleToRad(angle))
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z
    }
    // tbd
    cross(v) {
        return this.x * v.y + this.y * v.x
    }

    rotateZ(angle) {
        const radians = this.angleToRad(angle)
        return this.rotateZrad(radians)
    }

    rotateZrad(radians) {
        const c = cos(radians), s = sin(radians),
              [x, y] = this
        this.x = x * c - y * s
        this.y = x * s + y * c
        return this
    }

    getNormal() {
        return new this.constructor(-this.y, this.x, this.z)
    }

    angleBetween(v) {
        const form = this.dot(v) / (this.vlength() * v.vlength())
        return this.radToAngle(acos(form))
    }
}
