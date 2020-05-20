let scene, camera, renderer, matShader;

function mainC() {

	const startTime = Date.now();

	const main = new Project(
		function(main){
			main.loadShader("shaders/pinkFrag.frag", "frag");
			main.loadShader("shaders/vertexShader.vert", "vert");

			main.loadTexture("textures/images.jpg", "height");
			main.loadTexture("textures/terrain_texture.jpg", "terrain");

			main.loadModel("models/Palm_Tree.glb", "palm_tree1");
			main.loadModel("models/Palm_Tree.glb", "palm_tree2");
			main.loadModel("models/Palm_Tree.glb", "palm_tree3");

			main.loadModel("models/dog.glb", "dog");

			// setup the scene
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);

			//camera.position.z = -1;
			camera.rotation.x = 1.2;
			camera.translateZ( 20 );
		},

		function(main){
			const time = startTime - Date.now();
			if(matShader){
				matShader.uniforms.time.value = time/500;
			}

			models.dog.position.z = .5*Math.sin(time/500);

			renderer.render(scene, camera);
		},

		function(main){
			// add two point lights
			const light = new THREE.PointLight(0xff0000, 1.0);
			light.position.set(-10,-25,5);
			scene.add(light);
			const light2 = new THREE.PointLight(0xffffff, 1.0);
			light2.position.set(0,-25,5);
			scene.add(light2);

			const mountainUniforms = {
				texture1: { type: "t", value: textures.terrain },
				heightMap1: { type: "t",value: textures.height }
			};

			const mountainMaterial = new THREE.ShaderMaterial({
				uniforms: mountainUniforms, 
				vertexShader: shaders.vert,
				fragmentShader: shaders.frag
			});

			const mountain = new THREE.Mesh(new THREE.PlaneGeometry(20, 20, 200, 200), mountainMaterial);
			//mountain.position.z = -20;
			//mountain.rotation.x = -Math.PI/2;
			scene.add(mountain);


			const oceanMat = new THREE.MeshPhongMaterial({color:0x2288ff, shininess:100, side:THREE.DoubleSide})
			const p = new THREE.PlaneGeometry(20, 20, 100, 100);
			const ocean = new THREE.Mesh(p, oceanMat);
			ocean.position.z = .05;
			ocean.scale.set(1.1, 1.1, 1.1);
			//ocean.rotation.x = -Math.PI/2;
			scene.add(ocean);

			oceanMat.onBeforeCompile = (shader) => {
				shader.uniforms.time = { value: 0};
				shader.vertexShader = `
				        uniform float time;
				    ` + shader.vertexShader;
				
				const token = '#include <begin_vertex>'
				const customTransform = `
				        vec3 transformed = vec3(position);
				        float freq = 3.0;
				        float amp = 0.03;
				        float angle = (time + position.x)*freq;
				        transformed.z += sin(angle)*amp;

				        objectNormal = normalize(vec3(-amp * freq * cos(angle),0.0,1.0));
						vNormal = normalMatrix * objectNormal;
				`
				shader.vertexShader = shader.vertexShader.replace(token,customTransform);
				matShader = shader;
			}

			models.palm_tree1.rotation.x = Math.PI/2;
			models.palm_tree1.scale.set(.005,.005,.005);
			models.palm_tree1.position.set(1,1,1);

			models.palm_tree2.rotation.x = Math.PI/2;
			models.palm_tree2.rotation.y = 1;
			models.palm_tree2.scale.set(.006,.006,.006);
			models.palm_tree2.position.set(5,-3,0);

			models.palm_tree3.rotation.x = Math.PI/2;
			models.palm_tree3.rotation.y = -1;
			models.palm_tree3.scale.set(.005,.005,.005);
			models.palm_tree3.position.set(-6,3,0);

			models.dog.rotation.x = Math.PI/2;
			models.dog.rotation.y = -1.2;
			models.dog.scale.set(.1,.1,.1);
			models.dog.position.set(9,10,0);
		}
	);

	main.play();
}