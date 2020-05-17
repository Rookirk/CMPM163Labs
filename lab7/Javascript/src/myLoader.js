class MyLoader {
	constructor(project){
		this.project = project;

		this.mainLoaded = false;

		this.totalModels = 0;
		this.totalModelsLoaded = 0;

		this.totalShaders = 0;
		this.totalShadersLoaded = 0;

		this.totalTextures = 0;
		this.totalTexturesLoaded = 0;

		this.fileLoader = new THREE.FileLoader();
		this.textureLoader = new THREE.TextureLoader();
	}

	checkIfLoaded() {
		if( this.mainLoaded &&
			this.totalModels === this.totalModelsLoaded &&
			this.totalShaders === this.totalShadersLoaded &&
			this.totalTextures === this.totalTexturesLoaded )
		{
			this.project.buildScene(this.project);
			animate();
		}
	}

	mainIsLoaded() {
		this.mainLoaded = true;
		this.checkIfLoaded();
	}

	loadModel( file, name, transformFunc ){
		this.totalModels++;

		this.gltfLoader.load( file , function (gltf) {
			transformFunc(gltf);
			scene.add(gltf.scene);
			models[name] = gltf.scene;

			this.totalModelsLoaded++;
			if( this.totalModels === this.totalModelsLoaded ){
				project.animate();
			}
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
		},
		function (err) {
			console.error("model " + file + " failed to load");
				console.error(err);
		});
	}

	loadShader( file, name ){
		this.totalShaders++;

		const loader = this;

		this.fileLoader.load( file,
			// onLoad callback
			function (data) {
				console.log(data); // output the text to the console
				shaders[name] = data;
				
				loader.totalShadersLoaded++;
				loader.checkIfLoaded();
			},
			// onProgress callback
			function (xhr) {
				console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
			},
			// onError callback
			function (err) {
				console.error("Shader " + file + " failed to load");
				console.error(err);
			}
		);
	}

	loadTexture( file, name ) {
		this.totalTextures++;

		const loader = this;

		this.textureLoader.load( file,
			// onLoad callback
			function (data) {
				console.log(data); // output the text to the console
				textures[name] = data;
				
				loader.totalTexturesLoaded++;
				loader.checkIfLoaded();
			},
			// onProgress callback
			function (xhr) {
				console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
			},
			// onError callback
			function (err) {
				console.error("texture " + file + " failed to load");
				console.error(err);
			}
		);
	}
}