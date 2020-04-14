let scene, camera, renderer;

function main() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 17;

	var light = new THREE.PointLight(0xffffff, 1, 1000);
	light.position.set(50, 50, 50);
	scene.add(light);

	var Clarke;

	var loader = new THREE.GLTFLoader();
	loader.load('SexyClarke_Whole.glb', function (gltf) {
		gltf.scene.position.y = 3.4;
		gltf.scene.position.x = -.2;
		gltf.scene.rotation.y = -.35;
		scene.add(gltf.scene);
		Clarke = gltf.scene;
	}, function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
	}, function (error) {
		console.error(error);
	});

	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
		Clarke.rotation.y += .01;
	}
	animate();
}