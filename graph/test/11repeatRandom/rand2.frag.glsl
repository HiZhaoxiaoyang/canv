#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
uniform float uTime;

float random (vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898, 80.233))) * 43758.5453123);
}

void main(){
    vec2 st = vUv * vec2(100.0, 50.0);

    st.x -= (1.0 + 10.0 * random(vec2(floor(st.y)))) * uTime;

    vec2 ipos = floor(st);
    vec2 fpos = fract(st);

    vec3 color = vec3(step(random(ipos), 0.7));
    color *= step(0.2,fpos.y);

    gl_FragColor.rgb = color;
    gl_FragColor.a = 1.0;
    gl_FragColor.a = 1.0;
}