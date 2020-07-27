/**
 * Circle:
 * const x = x0 + r * cos(radians % PI )
 * const y = y0 + r * sin(radians % PI )
 */

 /**
 * Ellipse:
 * const x = x0 + a * cos(radians % PI )
 * const y = y0 + b * sin(radians % PI )
 * if(a === b) return Circle
 */

 /**
 * Parabola:
 * const p = 5
 * const x = x0 + 2 * p * t ** 2
 * const y = y0 + 2 * p * t
 */

 /**
 * Para:
 * const p = 25
 * t => 25 * t,
 * t => 25 * t ** 2
 */

 /**
 * Helical:
 * (t, l) => l * t * cos(t),
 * (t, l) => l * t * sin(t)
 */

 /**
 * 4polyStar:
 * (t, l) => l * cos(t) ** 3,
 * (t, l) => l * sin(t) ** 3
 */

 /**
 * quadricBezier:
 * (t, [{x: x0}, {x: x1}, {x: x2}]) => (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2,
 * (t, [{y: y0}, {y: y1}, {y: y2}]) => (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2,
 */
 
 /**
 * cubicBezier:
 * (t, [{x: x0}, {x: x1}, {x: x2}, {x: x3}]) => 
 *      (1 - t) ** 3 * x0 + 3 * t * (1 - t) ** 2 * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x3,
 * (t, [{y: y0}, {y: y1}, {y: y2}, {y: y3}]) => 
 *      (1 - t) ** 3 * y0 + 3 * t * (1 - t) ** 2 * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * y3,)
 */



function draw(points, context, {
  strokeStyle = 'black',
  fillStyle = null,
  close = false
} = {}) {
  context.strokeStyle = strokeStyle
  context.beginPath()
  context.moveTo(...points[0])
  for (let i = 1; i < points.length; i++) {
    context.lineTo(...points[i])
  }
  if(close) context.closePath()
  if (fillStyle) {
    context.fillStyle = fillStyle
    context.fill()
  }
  context.stroke()
}
  
let single = false
export function parametric(sFunc, tFunc, rFunc) {
  return function (start, end, seg = 100, ...args) {
    if(!single) {
      console.warn(`export function parametric(sFunc, tFunc, rFunc) {
        return function (start, end, seg = 100, ...args) {`)
      console.table({
        sFunc, tFunc, rFunc, start, end, seg, ...args
      })
      single = true
    }
    const points = []
    for (let i = 0; i < seg; i++) {
      const p = i / seg,
            t = start * (1 - p) + end * p,
            x = sFunc(t, ...args),
            y = tFunc(t, ...args)
      if (rFunc) {
        points.push(rFunc(x, y))
      } else {
        points.push([x, y])
      }
    }
    return {
      draw: draw.bind(null, points),
      points
    }
  }
}