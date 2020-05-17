let scene, camera, renderer, matShader;

function mainC() {

	const startTime = Date.now();

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

		},

		function(main){
			const time = startTime - Date.now();
			if(matShader){
				matShader.uniforms.time.value = time/500;
			}

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
			mountain.position.z = -20;
			mountain.rotation.x = -1.2;
			scene.add(mountain);


			const mat = new THREE.MeshPhongMaterial({color:0x2288ff, shininess:100, side:THREE.DoubleSide})
			const p = new THREE.PlaneGeometry(20, 20, 100, 100);
			const plane = new THREE.Mesh(p, mat);
			plane.position.z = -20;
			plane.rotation.x = -1.2;
			scene.add(plane);

			mat.onBeforeCompile = (shader) => {
				shader.uniforms.time = { value: 0};
				shader.vertexShader = `
				        uniform float time;
				    ` + shader.vertexShader;
				
				const token = '#include <begin_vertex>'
				const customTransform = `
				        vec3 transformed = vec3(position);
				        float freq = 3.0;
				        float amp = 0.1;
				        float angle = (time + position.x)*freq;
				        transformed.z += sin(angle)*amp;

				        objectNormal = normalize(vec3(-amp * freq * cos(angle),0.0,1.0));
						vNormal = normalMatrix * objectNormal;
				`
				shader.vertexShader = shader.vertexShader.replace(token,customTransform);
				matShader = shader;
			}
		}
	);

	main.play();
}