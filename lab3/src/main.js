const shaders = {};
const cubes = [];

let fileLoader, gltfLoader;
let scene, camera, renderer;

let cubeGeometry;

function main() {
	THREE.Cache.enabled = true;
	fileLoader = new THREE.FileLoader();
	//gltfLoader = new THREE.GLTFLoader();

	loadShader( 'shaders/vertexShader.vert', 'v', shaders );
	loadShader( 'shaders/fragmentShader.frag', 'f', shaders );

	// setup the scene
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 5;

	// setup the cube
	cubeGeometry = new THREE.BoxGeometry();

	// add the light
	var light = new THREE.PointLight(0xffffff, 1, 1000);
	light.position.set(10, 10, 10);
	scene.add(light);

	mainLoaded = true;
	checkIfLoaded();
}

function animate() {
	requestAnimationFrame(animate);

	cubeGeometry.rotateX(0.01);
	cubeGeometry.rotateY(0.01);

	renderer.render(scene, camera);
}

function buildScene() {
	const phongMaterial = new THREE.MeshPhongMaterial( {
		color: 0xdddddd,
		specular: 0x00ff00,
		shininess: 30,
		emissive: 0x00FFFF });

	const uniforms = {
		colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
		colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
	};

	const shaderMaterial =  new THREE.ShaderMaterial({
		uniforms: uniforms,
		fragmentShader: shaders.f,
		vertexShader: shaders.v,
		precision: "mediump"});

	addCube([0,0,0], phongMaterial);
	addCube([2,0,0], shaderMaterial);
}

function addCube( position, material ) {
	const cubeMesh = new THREE.Mesh(cubeGeometry, material);
	cubeMesh.position.set(...position);
	scene.add(cubeMesh);
}