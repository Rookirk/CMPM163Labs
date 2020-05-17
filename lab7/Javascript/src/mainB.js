let scene, camera, renderer;

function mainB() {

	const main = new Project(
		function(main){
			// setup the scene
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);

		},

		function(main){
			renderer.render(scene, camera);
		},

		function(main){
			// add two point lights
			const light = new THREE.PointLight(0xffffff, 1.0);
			light.position.set(-10,5,-25);
			scene.add(light);
			const light2 = new THREE.PointLight(0xffffff, 1.0);
			light2.position.set(0,5,-25);
			scene.add(light2);

		}
	);

	main.play();
}