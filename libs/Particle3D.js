/*
 * Particle 3D Class
 * createby@zhaoxiaoyang
 */
import { Vec3D } from './Vec3D.js'

const { hypot, tan, atan2, sin, cos, acos, PI } = Math

export class Particle3D {
    constructor(x, y, z, ctx, ID, depth) {
        this.position = new Vec3D(x, y, z)
        this.ctx = ctx
        // this.mc = this.attachGraphic(this.position.x, this.position.y, ID, depth)
        this.scale = 100
        // this.render()
    }
    attachGraphic(x, y, ID, depth) {
        // return this.timeline.attachMovie(ID, `${ID}_${depth}`, depth)
        return this.ctx.fillRect(x, y, 10, 10)
    }
    render() {
        const pers = this.position.getPerspective()
        this.screenPos = this.position.persProjectNew(pers)
        // this.mc._x = this.screenPos.x
        // this.mc._y = this.screenPos.y
        this.attachGraphic(this.screenPos.x, this.screenPos.y, 1, 0)
        this._xscale = this._yscale = this.scale * pers
        // swapDepth(100000 - this.position.z * 100)
    }
}