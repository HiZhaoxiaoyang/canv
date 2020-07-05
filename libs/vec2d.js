const { hypot, atan2, sin, cos, PI } = Math

export class Vec2d extends Array {
    constructor(x=0, y=0) {
        super(x, y)
        this.x = x
        this.y = y
    }

    add(vx, vy){
        this.x += vx
        this.y += vy
    }

    vlength() {
        return hypot(this.x, this.y)
    }

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
        return this.radToDegree(rad())
    }

    theaToDir() {
        const r = this.vlength(),
              thea = this.rad()
        return [
            r * cos(thea),
            r * sin(thea)
        ]
    }

    dot(v) {
        return this.x * v.x + this.y * v.y
    }

    cross(v) {
        return this.x * v.y + this.y * v.x
    }

    rotate(rd) {
        const s = sin(rd), c = cos(rd)
        this.x = this.x * c + this.y * -s
        this.y = this.x * s + this.y * c
        return this
    }
}
