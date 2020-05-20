uniform sampler2D texture1;
varying vec2 vUv;

void main() {
	gl_FragColor = vec4(1.0, 0.0, 1.0, 0.0) * texture2D(texture1, vUv);
}