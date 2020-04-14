let totalModels = 0;
let totalModelsLoaded = 0;

function myLoad( file, name, modelsDS, transformFunc ){
	totalModels++;

	const loader = new THREE.GLTFLoader();

	loader.load( file , function (gltf) {
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