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

    cross(v) {
        const { x, y, z } = this,
              cx = y * v.z - z * v.y,
              cy = z * v.x - x * v.z,
              cz = x * v.y - y * v.x
        return new this.constructor(cx, cy, cz)
        // return this.x * v.y + this.y * v.x
    }

    angleBetween(v) {
        const form = this.dot(v) / (this.vlength() * v.vlength())
        return this.radToAngle(acos(form))
    }

    getPerspective(viewDist) {
        if (viewDist === undefined) viewDist = 300
        return viewDist / (this.z + viewDist)
    }

    persProject(p) {
        p = p || this.getPerspective()
        this.x *= p
        this.y *= p
        this.z = 0
        return this
    }

    persProjectNew(p) {
        p = p || this.getPerspective()
        this.x *= p
        this.y *= p
        return new this.constructor(this.x, this.y, 0)
    }

    rotateX(angle) {
        let c = this.angleToCos(angle),
            s = this.angleToSin(angle)
        // this.y = y * c - z * s
        // this.z = y * s + z * c
        return this.rotateXTrig(c ,s)
    }

    rotateXTrig(c, s) {
        const {x, y, z} = this
        this.y = y * c - z * s
        this.z = y * s + z * c
        return this
    }

    rotateY(angle) {
        let c = this.angleToCos(angle),
            s = this.angleToSin(angle)
        return this.rotateYTrig(c ,s)
    }

    rotateYTrig(c, s) {
        const {x, y, z} = this
        this.x = x * c - z * s
        this.z = x * -s + z * c
        return this
    }

    rotateZ(angle) {
        let c = this.angleToCos(angle),
            s = this.angleToSin(angle)
        return this.rotateZTrig(c ,s)
    }

    rotateZTrig(c, s) {
        const {x, y, z} = this
        this.x = x * c - y * s
        this.y = x * s + y * c
        return this
    }

    rotateXY(a, b) {
        let ca = this.angleToCos(a),
            sa = this.angleToSin(a),
            cb = this.angleToCos(b),
            sb = this.angleToSin(b)
        return this.rotateXYTrig(ca, sa, cb, sb)
    }

    rotateXYTrig(ca, sa, cb, sb) {
        const {x, y, z} = this,
              rz = y * sa + z * ca      // rotate x
        this.y = y * ca - z * sa
        this.z = x * - sb + rz * cb
        this.x = x * cb + rz * sb
        return this
    }

    rotateXYZ(a, b, c) {
        const ca = this.angleToCos(a),
            sa = this.angleToSin(a),
            cb = this.angleToCos(b),
            sb = this.angleToSin(b),
            cc = this.angleToCos(c),
            sc = this.angleToSin(c)
        return this.rotateXYZTrig(ca, sa, cb, sb, cc, sc)
    }

    rotateXYZTrig(ca, sa, cb, sb, cc, sc) {
        const {x, y, z} = this,
            // rotate x
            ry = y * ca - z * sa,
            rz = y * sa + z * ca,
            // rotate y
            rx = x * cb - rz * sb
        this.z = x * -sb + rz * cb
        // rotate z
        this.x = rx * cc - ry * sc
        this.y = rx * sc + ry * cc
        return this
    }

    /*
    rotateZrad(radians) {
        const c = cos(radians), s = sin(radians),
              [x, y] = this
        this.x = x * c - y * s
        this.y = x * s + y * c
        return this
    }*/

    getNormal() {
        return new this.constructor(-this.y, this.x, this.z)
    }
}
