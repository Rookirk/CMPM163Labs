const shaders = {}, textures = {};

let fileLoader, textureLoader;

let scene, camera, renderer, light;

function main() {
	THREE.Cache.enabled = true;
	fileLoader = new THREE.FileLoader();
	textureLoader = new THREE.TextureLoader();

	var geometry1, material1, mesh1;

	loadShader( 'shaders/vertexShader.vert', 'v', shaders );
	loadShader( 'shaders/texturedFragShader.frag', 'f', shaders );
	loadTexture( "textures/156.jpg", 'albedo_156', textures );
	loadTexture( "textures/156_norm.jpg", 'norm_156', textures );
	loadTexture( "textures/163.jpg", 'albedo_163', textures );
	loadTexture( "textures/163_norm.jpg", 'norm_163', textures );

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

	mainLoaded = true;
	checkIfLoaded();
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
	var geometry = new THREE.BoxGeometry();
	var material = new THREE.MeshPhongMaterial( {
		map: textures.albedo_156,
		normalMap: textures.norm_156
	} );
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	var material2 = new THREE.MeshPhongMaterial( { map: textures.albedo_156 });
	var cube2 = new THREE.Mesh(geometry, material2);
	scene.add(cube2);
	cube2.position.x -= 2;

	var material3 = new THREE.MeshPhongMaterial( {
		map: textures.albedo_163,
		normalMap: textures.norm_163
	});

	var cube2 = new THREE.Mesh(geometry, material3);
	scene.add(cube2);
	cube2.position.x += 2;

	var uniforms = {
		texture1: {
			type: "t",
			value: THREE.ImageUtils.loadTexture("textures/156.jpg")
		},
		u_uvSize: { value: 2.0 }
	};

	geometry1 = new THREE.BoxGeometry(1, 1, 1);
	material1 =  new THREE.ShaderMaterial({
	uniforms: uniforms,
		fragmentShader: shaders.f,
		vertexShader: shaders.v,
		precision: "mediump"
	});

	mesh1 = new THREE.Mesh(geometry1, material1);
	mesh1.position.x = 4;
	scene.add(mesh1);
}