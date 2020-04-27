const shaders = {}, textures = {};

let scene, camera, renderer, light;
let cubGeometry;

function main() {
	THREE.Cache.enabled = true;
	
	initLoaders();

	loadShader( 'shaders/vertexShader.vert', 'v', shaders );
	loadShader( 'shaders/texturedFragShader.frag', 'f', shaders );
	loadTexture( "textures/156.jpg", 'albedo_156', textures );
	loadTexture( "textures/156_norm.jpg", 'norm_156', textures );
	loadTexture( "textures/163.jpg", 'albedo_163', textures );
	loadTexture( "textures/163_norm.jpg", 'norm_163', textures );
	loadTexture( "textures/170.jpg", 'albedo_170', textures );
	loadTexture( "textures/170_norm.jpg", 'norm_170', textures );
	loadTexture( "textures/176.jpg", 'albedo_176', textures );
	loadTexture( "textures/176_norm.jpg", 'norm_176', textures );

	// setup the scene
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, 
	window.innerWidth/window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 5;

	// add the light
	light = new THREE.PointLight(0xffffff, 1, 1000);
	light.position.set(0, 10, 10);
	scene.add(light);

	mainIsLoaded();
}

function animate() {
	light.translateZ( -10 );
	light.rotation.y -= .1;
	light.translateZ( 10 );

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

function buildScene() {
	// setup the cube
	cubeGeometry = new THREE.BoxGeometry();

	const material_156 = new THREE.MeshPhongMaterial( { map: textures.albedo_156 });

	const material_156norm = new THREE.MeshPhongMaterial( {
		map: textures.albedo_156,
		normalMap: textures.norm_156
	} );

	const material_163norm = new THREE.MeshPhongMaterial( {
		map: textures.albedo_163,
		normalMap: textures.norm_163
	});

	const uniforms1 = {
		texture1: {
			type: "t",
			value: THREE.ImageUtils.loadTexture("textures/170.jpg")
		},
		u_uvSize: { value: 1.0 }
	};

	const material_shaders1 =  new THREE.ShaderMaterial({
		uniforms: uniforms1,
		fragmentShader: shaders.f,
		vertexShader: shaders.v,
		precision: "mediump"
	});

	const uniforms2 = {
		texture1: {
			type: "t",
			value: THREE.ImageUtils.loadTexture("textures/176.jpg")
		},
		u_uvSize: { value: 2.0 }
	};

	const material_shaders2 =  new THREE.ShaderMaterial({
		uniforms: uniforms2,
		fragmentShader: shaders.f,
		vertexShader: shaders.v,
		precision: "mediump"
	});

	addCube( [-4, 0, 0], material_156 );
	addCube( [-2, 0, 0], material_156norm );
	addCube( [0, 0, 0], material_163norm );
	addCube( [2, 0, 0], material_shaders1 );
	addCube( [4, 0, 0], material_shaders2 );
}

function addCube( position, material ) {
	const cubeMesh = new THREE.Mesh(cubeGeometry, material);
	cubeMesh.position.set(...position);
	scene.add(cubeMesh);
}