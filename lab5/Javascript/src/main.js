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

	var material = new THREE.PointsMaterial( { color: 0xef983e } );

	var points = new THREE.Points(geometry, material);
	scene.add(points);

	mainIsLoaded();
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

function buildScene() {

}