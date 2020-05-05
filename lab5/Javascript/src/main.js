const shaders = {}, textures = {};

let scene, camera, renderer, light;
let particleMat;

function main() {
	THREE.Cache.enabled = true;

	initLoaders();

	loadTexture( "textures/disc.png", 'disc', textures );

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
	var time = Date.now() * 0.00005;
	var h = (360 * (1.0 + time) % 360) / 360;
	particleMat.color.setHSL(h, 0.5, 0.5);

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

function buildScene() {
	var vertices = [];

	for ( var i = 0; i < 1000; i ++ ) {
		var x = THREE.MathUtils.randFloatSpread( 500 );
		var y = THREE.MathUtils.randFloatSpread( 500 );
		var z = THREE.MathUtils.randFloatSpread( 100 );
		vertices.push( x, y, z );
	}

	var geometry = new THREE.BufferGeometry();
	geometry.setAttribute( 'position', new 
	THREE.Float32BufferAttribute(vertices, 3));

	particleMat = new THREE.PointsMaterial( { size: 20, sizeAttenuation: false, map: textures.disc, alphaTest: 0.5, transparent: true } );
	particleMat.color.setHSL( 1.0, 0.3, 0.7 );

	var points = new THREE.Points(geometry, particleMat);
	scene.add(points);
}