#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;

uniform vec2 u_resolution;
uniform int rows;

float random (vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898, 80.233))) * 43758.5453123);
}

void main(){
    vec2 st = vUv * 8.0;

    // gl_FragColor.rgba = vec4(random(floor(st)), 1.0);
    gl_FragColor.rgba = vec4(random(floor(st)));
    // gl_FragColor.rgb = vec3(random(floor(st)));
    gl_FragColor.a = 1.0;
}