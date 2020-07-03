const { hypot, aten2, sin, cos, PI } = Math

class Vec2d extends Array {
    // constructor(x=1, y=0) {
    //     super(x, y)
    // }
    constructor(x, y){
        this.x = x
        this.y = y
    }

    add(vx, vy){
        this.x += vx
        this.y += vy
    }

    get length() {
        return hypot(this.x, this.y)
    }

    rad() {
        return aten2(this.y, this.x)
    }

    degreeToRad(degree) {
        return degree * PI / 180
    }

    radToDegree(rd) {
        rd * 180 / PI
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

export default Vec2d