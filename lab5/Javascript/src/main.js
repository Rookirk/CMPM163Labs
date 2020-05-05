const shaders = {}, textures = {};

let scene, camera, renderer, light;
let cubGeometry;

function main() {
	THREE.Cache.enabled = true;

	initLoaders();
	// setup the scene
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 60;

	mainIsLoaded();
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

function buildScene() {
	
}