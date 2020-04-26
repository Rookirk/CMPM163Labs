let mainLoaded = false;

let totalModels = 0;
let totalModelsLoaded = 0;

let totalShaders = 0;
let totalShadersLoaded = 0;

let totalTextures = 0;
let totalTexturesLoaded = 0;

let fileLoader, textureLoader;

function initLoaders() {
	fileLoader = new THREE.FileLoader();
	textureLoader = new THREE.TextureLoader();
}

function checkIfLoaded() {
	if( mainLoaded &&
		totalModels === totalModelsLoaded &&
		totalShaders === totalShadersLoaded &&
		totalTextures === totalTexturesLoaded )
	{
		buildScene();
		animate();
	}
}

function mainIsLoaded() {
	mainLoaded = true;
	checkIfLoaded();
}

function loadModel( file, name, modelsDS, transformFunc ){
	totalModels++;

	gltfLoader.load( file , function (gltf) {
		transformFunc(gltf);
		scene.add(gltf.scene);
		modelsDS[name] = gltf.scene;

		totalModelsLoaded++;
		if( totalModels === totalModelsLoaded ){
			animate();
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

function loadShader( file, name, shadersDS ){
	totalShaders++;

	fileLoader.load( file,
		// onLoad callback
		function (data) {
			console.log(data); // output the text to the console
			shadersDS[name] = data;
			
			totalShadersLoaded++;
			checkIfLoaded();
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

function loadTexture( file, name, texturesDS ) {
	totalTextures++;

	textureLoader.load( file,
		// onLoad callback
		function (data) {
			console.log(data); // output the text to the console
			texturesDS[name] = data;
			
			totalTexturesLoaded++;
			checkIfLoaded();
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