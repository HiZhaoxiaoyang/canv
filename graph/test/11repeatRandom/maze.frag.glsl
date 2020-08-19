#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592658589793

varying vec2 vUv;

uniform vec2 u_resolution;
uniform int rows;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898, 80.233))) * 43758.5453123);
}

vec2 truchetPattern(in vec2 _st, in float _index) {
    _index = fract(((_index-0.5)*2.0));
    _st = _index > 0.75 ? vec2(1.0) - _st :
            _index > 0.5 ? vec2(1.0 - _st.x, _st.y) :
            _index > 0.25 ? 1.0-vec2(1.0 - _st.x, _st.y) : _st;
    return _st;
}

void main(){
    vec2 st = vUv * float(rows);

    vec2 ipos = floor(st);
    vec2 fpos = fract(st);

    vec2 tile = truchetPattern(fpos, random(ipos));

    float color = 0.0;

    color = smoothstep(tile.x - 0.3, tile.x, tile.y) - smoothstep(tile.x, tile.x+0.3, tile.y);
    gl_FragColor = vec4(vec3(color),1.0);
}