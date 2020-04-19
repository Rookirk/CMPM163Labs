varying vec3 vUv;

uniform vec3 colorA;
uniform vec3 colorB;

void main() {
	gl_FragColor = vec4( (vUv.x + 1.0) / 2.0, (vUv.y + 1.0) / 2.0, (vUv.z + 1.0) / 2.0, 1.0);
}