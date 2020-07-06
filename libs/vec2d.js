const { hypot, atan2, sin, cos, acos, PI } = Math

export class Vec2d extends Array {
    constructor(x=0, y=0) {
        super(x, y)
        this.x = x
        this.y = y
    }

    /**
     * Begin of angle,radians,sin/cos/tan..
     */
    rad() {
        return Math.atan2(this.y, this.x)
    }

    degreeToRad(degree) {
        return degree * PI / 180
    }

    radToDegree(rd) {
        return rd * 180 / PI
    }

    sinFromDegree(degree) {
        return sin(this.degreeToRad(degree))
    }

    cosFromDegree(degree) {
        return cos(this.degreeToRad(degree))
    }

    tanFromDegree(degree) {
        return tan(this.degreeToRad(degree))
    }

    vecToDegree() {
        return this.radToDegree(this.rad())
    }

    cartesianToPolar(v) {
        const radius = hypot(v.x, v.y),
            theta = this.radToDegree(atan2(v.y, v.x))
        return { r: radius, t: theta }
    }

    polarToCartesian(p) {
        return {
            x: p.r * cos(p.t),
            y: p.r * sin(p.t)
        }
    }
    /** end of angle,radians,sin/cos/tan.. */

    
    add(v) {
        this.x += v.x
        this.y += v.y
    }

    addNew(v) {
        return new this.constructor(this.x + v.x, this.y + v.y )
    }

    sub(v) {
        this.x -= v.x
        this.y -= v.y
    }

    subNew(v) {
        return new this.constructor( this.x - v.x, this.y - v.y )
    }

    negate() {
        this.x = -this.x
        this.y = -this.y
    }

    negateNew(v) {
        return new this.constructor(-this.x, -this.y)
    }

    scale(s) {
        this.x *= s
        this.y *= s
    }

    scaleNew(v) {
        return new this.constructor( this.x * s, this.y * s )
    }

    reset() {
        return this.constructor(this.x, this.y)
    }

    clone() {
        // return new this.constructor(this.x, this.y)
        return new Vec2d(this.x, this.y)
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
        return this.vecToDegree()
    }

    setAngle(angle) {
        const r = this.vlength()
        this.x = r * cos(this.degreeToRad(angle))
        this.y = r * sin(this.degreeToRad(angle))
    }

    dot(v) {
        return this.x * v.x + this.y * v.y
    }

    cross(v) {
        return this.x * v.y + this.y * v.x
    }

    rotate(angle) {
        const radians = this.degreeToRad(angle), 
            c = cos(radians), s = sin(radians)
        this.x = this.x * c + this.y * -s
        this.y = this.x * s + this.y * c
        // return this
    }

    getNormal() {
        return new this.constructor(-this.y, this.x)
    }

    isPerpTo(v) {
        return this.dot(v) === 0
    }

    angleBetween(v) {
        const form = this.dot(v) / (this.vlength() * v.vlength())
        return this.radToDegree(acos(form))
    }
}
