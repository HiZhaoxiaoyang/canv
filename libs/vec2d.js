const { hypot, atan2, sin, cos, acos, PI } = Math

export class Vec2D extends Array {
    constructor(x=1, y=0) {
        super(x, y)
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

    // 笛卡尔坐标转极坐标
    cartesianToPolar(v) {
        const radius = hypot(v.x, v.y),
            theta = this.radToAngle(atan2(v.y, v.x))
        return { r: radius, t: theta }
    }
    // 极坐标转笛卡尔坐标
    polarToCartesian(p) {
        return {
            x: p.r * cos(p.t),
            y: p.r * sin(p.t)
        }
        // this.x = p.r * cos(p.t)
        // this.y = p.r * sin(p.t)
        // return this
    }
    /** end of angle,radians,sin/cos/tan.. */

    
    add(v) {
        this.x += v.x
        this.y += v.y
        return this
    }

    addNew(v) {
        return new this.constructor(this.x + v.x, this.y + v.y )
    }

    sub(v) {
        this.x -= v.x
        this.y -= v.y
        return this
    }

    subNew(v) {
        return new this.constructor( this.x - v.x, this.y - v.y )
    }

    negate() {
        this.x = -this.x
        this.y = -this.y
        return this
    }

    negateNew(v) {
        return new this.constructor(-this.x, -this.y)
    }

    scale(s) {
        this.x *= s
        this.y *= s
        return this
    }

    scaleNew(v) {
        return new this.constructor( this.x * s, this.y * s )
    }

    reset() {
        return this.constructor(this.x, this.y)
    }

    clone() {
        // return new this.constructor(this.x, this.y)
        return new Vec2D(this.x, this.y)
    }

    equals(v) {
        return this.x === v.x && this.y === v.y
    }

    vlength() {
        return hypot(this.x, this.y)
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
    }

    normalize() {
        return this.scale(1 / this.vlength())
    }

    dot(v) {
        return this.x * v.x + this.y * v.y
    }

    cross(v) {
        return this.x * v.y + this.y * v.x
    }

    rotate(angle) {
        const radians = this.angleToRad(angle)
        return this.rotateRad(radians)
    }

    rotateRad(radians) {
        const c = cos(radians), s = sin(radians),
              [x, y] = this
        this.x = x * c - y * s
        this.y = x * s + y * c
        return this
    }

    getNormal() {
        return new this.constructor(-this.y, this.x)
    }

    isPerpTo(v) {
        return this.dot(v) === 0
    }

    angleBetween(v) {
        const form = this.dot(v) / (this.vlength() * v.vlength())
        return this.radToAngle(acos(form))
    }
}
