let scene, camera, renderer;
let models = {};

const cameraDist = 17;

function main() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.translateZ( cameraDist );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	pointLight.position.set(50, 50, 50);
	scene.add( pointLight );

	const pointLight2 = new THREE.PointLight(0x633284, .5, 1000);
	pointLight2.position.set(-50, -50, -50);
	scene.add( pointLight2 );

	myLoad('SexyClarke_Whole.glb', "Clarke", models, function(gltf){
		gltf.scene.position.y = 3.4;
		gltf.scene.position.x = -.2;
		gltf.scene.rotation.y = -.35;
	});
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

	//models.Clarke.rotation.y += .01;

	cameraRotate();
}

function cameraRotate(){
	camera.translateZ( -cameraDist );
	camera.rotation.y -= .01;
	camera.translateZ( cameraDist );
}