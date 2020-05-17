uniform sampler2D heightMap1;

varying vec2 vUv;

void main() {
	vUv = uv;
	vec4 heightColor = texture2D(heightMap1, uv);
	vec3 newPosition = position + normal * 1.0 * heightColor.r;
	vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
	gl_Position = projectionMatrix * modelViewPosition;
}