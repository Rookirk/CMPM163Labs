let totalModels = 0;
let totalModelsLoaded = 0;

let totalShaders = 0;
let totalShadersLoaded = 0;

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
	function (error) {
		console.error(error);
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
			console.error('An error happened');
		}
	);
}

function checkIfLoaded() {
	if( totalModels === totalModelsLoaded &&
		totalShaders === totalShadersLoaded )
	{
		addCoolCube([2,0,0]);
	}
}