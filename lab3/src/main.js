const shaders = {}, textures = {};

let fileLoader, textureLoader, gltfLoader;
let scene, camera, renderer;

let cubeGeometry;

function main() {
	THREE.Cache.enabled = true;
	fileLoader = new THREE.FileLoader();
	textureLoader = new THREE.TextureLoader();
	//gltfLoader = new THREE.GLTFLoader();

	loadShader( 'shaders/vertexShader.vert', 'v', shaders );
	loadShader( 'shaders/colorInterpolate.frag', 'colorInterpolate', shaders );
	loadShader( 'shaders/myFragmentShader.frag', 'myFragShader', shaders );

	loadTexture( 'maps/AlbedoMaterial.png', 'albedo', textures );
	loadTexture( 'maps/HeightMaterial.png', 'height', textures );
	loadTexture( 'maps/EmissiveMaterial.png', 'emissive', textures );
	loadTexture( 'maps/NormalMaterial.png', 'normal', textures );
	loadTexture( 'maps/bumpMap.jpg', 'bump', textures );

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

	var light2 = new THREE.PointLight(0xffffff, 1, 1000);
	light2.position.set(10, -10, 10);
	scene.add(light2);

	mainLoaded = true;
	checkIfLoaded();
}

function animate() {
	requestAnimationFrame(animate);

	cubeGeometry.rotateX(0.02);
	cubeGeometry.rotateY(0.01);

	renderer.render(scene, camera);
}

function buildScene() {
	const phongMaterial1 = new THREE.MeshPhongMaterial( {
		color: 0xFF9BF1,
		specular: 0x00ff00,
		shininess: 30,
	});

	// bump map used from:
	// http://www.bundysoft.com/wiki/doku.php?id=tutorials:l3dt:bumpmap
	const phongMaterial2 = new THREE.MeshPhongMaterial( {
		color: 0xFF9BF1,
		specular: 0x00ff00,
		shininess: 30,
		bumpMap: textures.bump
	});

	const shaderMaterial1 =  new THREE.ShaderMaterial({
		uniforms: {
			colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
			colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
		},
		fragmentShader: shaders.colorInterpolate,
		vertexShader: shaders.v,
		precision: "mediump"
	});

	// I generated these textures with Substance Painter
	const phongMaterial3 = new THREE.MeshPhongMaterial( {
		map: textures.albedo,
		bumpMap: textures.height,
		emissiveMap: textures.emissive,
		normalMap: textures.normal
	});

	const shaderMaterial2 =  new THREE.ShaderMaterial({
		uniforms: {
			colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
			colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
		},
		fragmentShader: shaders.myFragShader,
		vertexShader: shaders.v,
		precision: "mediump"
	});

	addCube([-1,-1,0], phongMaterial1);
	addCube([-3,-1,0], phongMaterial2);
	addCube([1,-1,0], shaderMaterial1);
	addCube([-1,1,0], phongMaterial3);
	addCube([1,1,0], shaderMaterial2);
}

function addCube( position, material ) {
	const cubeMesh = new THREE.Mesh(cubeGeometry, material);
	cubeMesh.position.set(...position);
	scene.add(cubeMesh);
}