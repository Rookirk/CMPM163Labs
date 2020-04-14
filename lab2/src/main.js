let scene, camera, renderer;
let models = {};

const cameraDist = 20;

function main() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.rotation.y = 1.5708;
	camera.translateZ( cameraDist );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const pointLight = new THREE.PointLight(0xFF5656, 1, 500);
	pointLight.position.set(50, 50, 50);
	scene.add( pointLight );

	// purple
	const pointLight2 = new THREE.PointLight(0x7E00D8, .5, 1000);
	pointLight2.position.set(-50, -50, -50);
	scene.add( pointLight2 );

	// green
	const pointLight3 = new THREE.PointLight(0x4AD350, 1, 20);
	pointLight3.position.set(5, -5, 5);
	scene.add( pointLight3 );

	// blue
	const pointLight4 = new THREE.PointLight(0x2849EF, 1, 20);
	pointLight4.position.set(-5, -5, 5);
	scene.add( pointLight4 );

	myLoad('SexyClarke_Whole.glb', "Clarke", models, function(gltf){
		gltf.scene.position.set( -.2, 3.05, 0);
	});

	myLoad('chair.glb', "Chair", models, function(gltf){
		gltf.scene.scale.set( 2.5, 2.5, 2.5 );
		gltf.scene.rotation.y = .35;
		gltf.scene.position.set( -1, -2, -3.5 );
	});

	myLoad('cat.glb', "Cat", models, function(gltf){
		gltf.scene.scale.set( .06, .06, .06 );
		gltf.scene.rotation.y = .7;
		gltf.scene.position.set( -2.1, -3.5, 1 );
	});

	myLoad('dog.glb', "Dog", models, function(gltf){
		gltf.scene.scale.set( .06, .06, .06 );
		gltf.scene.rotation.y = -.5;
		gltf.scene.position.set( 3.2, -4, -2.7 );
	});

	myLoad('wine_bottle.glb', "Bottle", models, function(gltf){
		gltf.scene.scale.set( .7, .7, .7 );
		gltf.scene.rotation.z = -1.2;
		gltf.scene.rotation.y = -.4;
		gltf.scene.position.set( -4.3, 2.5, -1.5 );
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