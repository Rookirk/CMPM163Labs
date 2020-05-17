let scene, camera, renderer;

function mainA() {

	const main = new Project(
		function(main){
			main.loadShader("shaders/fragShader.frag", "frag");
			main.loadShader("shaders/vertexShader.vert", "vert");

			main.loadTexture("textures/images.jpg", "height");
			main.loadTexture("textures/terrain_texture.jpg", "terrain");

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
			const light = new THREE.DirectionalLight(0xffffff, 1.0);
			light.position.set(1,1,1).normalize();
			scene.add(light);
			scene.add(new THREE.AmbientLight(0xffffff, 0.3));

			const uniforms = {
				texture1: { type: "t", value: textures.terrain },
				heightMap1: { type: "t",value: textures.height }
			};

			const material = new THREE.ShaderMaterial({
				uniforms: uniforms, 
				vertexShader: shaders.vert,
				fragmentShader: shaders.frag
			});

			const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 200, 200), material);
			plane.position.z = -10;
			plane.position.y = -1;
			plane.rotation.x = -Math.PI / 2;
			scene.add(plane);

		}
	);

	main.play();
}