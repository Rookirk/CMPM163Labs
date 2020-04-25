
function main() {
	// setup the scene
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, 
	window.innerWidth/window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 5;

	// import textures
	var texture156 = THREE.ImageUtils.loadTexture("textures/156.jpg");
	var normMap156 = THREE.ImageUtils.loadTexture("textures/156_norm.jpg");
	var texture163 = THREE.ImageUtils.loadTexture("textures/163.jpg");
	var normMap163 = THREE.ImageUtils.loadTexture("textures/163_norm.jpg");

	// setup the cube
	var geometry = new THREE.BoxGeometry();
	var material = new THREE.MeshPhongMaterial( {
		map: texture156,
		normalMap: normMap156
	} );
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	var material2 = new THREE.MeshPhongMaterial( { map: texture156 });
	var cube2 = new THREE.Mesh(geometry, material2);
	scene.add(cube2);
	cube2.position.x -= 2;

	var material3 = new THREE.MeshPhongMaterial( {
		map: texture163,
		normalMap: normMap163
	});
	var cube2 = new THREE.Mesh(geometry, material3);
	scene.add(cube2);
	cube2.position.x += 2;


	// add the light
	var light = new THREE.PointLight(0xffffff, 1, 1000);
	light.position.set(0, 10, 10);
	scene.add(light);

	function animate() {
		light.translateZ( -10 );
		light.rotation.y -= .1;
		light.translateZ( 10 );

		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}
	animate();
}