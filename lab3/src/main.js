var geometry1, material1, mesh1;
const shaders = {};

let fileLoader, gltfLoader;
let scene;

function main() {
	THREE.Cache.enabled = true;
	fileLoader = new THREE.FileLoader();
	//gltfLoader = new THREE.GLTFLoader();

	loadShader( 'shaders/vertexShader.vert', 'v', shaders );
	loadShader( 'shaders/fragmentShader.frag', 'f', shaders );


	// setup the scene
	scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 5;

	// setup the cube
	var geometry = new THREE.BoxGeometry();
		var material = new THREE.MeshPhongMaterial( {
			color: 0xdddddd,
			specular: 0x00ff00,
			shininess: 30,
			emissive: 0x00FFFF });

		var cube = new THREE.Mesh( geometry, material );
		scene.add(cube);

	// add the light
	var light = new THREE.PointLight(0xffffff, 1, 1000);
	light.position.set(10, 10, 10);
	scene.add(light);

	function animate() {
		requestAnimationFrame(animate);
		geometry.rotateX(0.01);
		geometry.rotateY(0.01);

		if(geometry1) {
			geometry1.rotateX(0.01);
			geometry1.rotateY(0.01);
		}

		renderer.render(scene, camera);
	}
	animate();
}

function addCoolCube(position) {
	let uniforms = {
		colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
		colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
	};

	geometry1 = new THREE.BoxGeometry(1, 1, 1);
	material1 =  new THREE.ShaderMaterial({
		uniforms: uniforms,
		fragmentShader: shaders.f,
		vertexShader: shaders.v,
		precision: "mediump"});

	mesh1 = new THREE.Mesh(geometry1, material1);
	mesh1.position.set(...position);
	scene.add(mesh1);	
}