let scene, camera, renderer;

function mainA() {

	const main = new Project(
		function(main){
			main.loadShader("shaders/fragShader.frag", "frag");
			main.loadShader("shaders/vertexShader.vert", "vert");

			// setup the scene
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);
			camera.position.y = 5;
			camera.position.z = 0;
			camera.rotation.x = -.5;
		},

		function(main){
			renderer.render(scene, camera);
		},

		function(main){
			light = new THREE.DirectionalLight(0xffffff, 1.0);
			light.position.set(1,1,1).normalize();
			scene.add(light);
			scene.add(new THREE.AmbientLight(0xffffff, 0.3));
		}
	);

	main.play();
}