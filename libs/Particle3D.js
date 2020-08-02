/*
 * Particle 3D Class
 * createby@zhaoxiaoyang
 */
import { Vec3D } from './Vec3D.js'

const { hypot, tan, atan2, sin, cos, acos, PI } = Math

export class Particle3D {
    constructor(x, y, z, timeline, ID, depth) {
        this.position = new Vec3D(x, y, z)
        this.timeline = timeline
        this.mc = this.attachGraphic(ID, depth)
        this.scale = 100
        this.render()
    }
    attachGraphic(ID, depth) {
        return this.timeline.attachMovie(ID, `${ID}_${depth}`, depth)
    }
    render() {
        const pers = this.position.getPerspective(),
        this.screenPos = this.position.persProjectNew(pers)
        this.mc._x = this.screenPos.x
        this.mc._y = this.screenPos.y
        this._xscale = this._yscale = this.scale * pers
        swapDepth(100000 - this.position.z * 100)
    }
}