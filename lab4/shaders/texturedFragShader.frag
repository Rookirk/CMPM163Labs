uniform sampler2D texture1;
uniform float u_uvSize;

varying vec2 vUv;

void main() {
	// sample from the texture based on the uv coordinates
	vec2 scaledUV = vUv * u_uvSize;
	float truncU = scaledUV.x - floor(scaledUV.x);
	float truncV = scaledUV.y - floor(scaledUV.y);
	vec2 newUV = vec2(truncU, truncV);
	gl_FragColor = texture2D(texture1, newUV);
}
