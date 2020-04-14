let scene, camera, renderer;
let models = {};

function main() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.z = 17;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var light = new THREE.PointLight(0xffffff, 1, 1000);
	light.position.set(50, 50, 50);
	scene.add(light);

	myLoad('SexyClarke_Whole.glb', "Clarke", models, function(gltf){
		gltf.scene.position.y = 3.4;
		gltf.scene.position.x = -.2;
		gltf.scene.rotation.y = -.35;
	});
}