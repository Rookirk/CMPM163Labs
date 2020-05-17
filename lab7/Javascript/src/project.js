const shaders = {}, textures = {};
let projectRef;

class Project {
	constructor(init, animate, buildScene){
		this.init = init;
		this.animate = animate;
		this.buildScene = buildScene;
		projectRef = this;
	}

	loadModel( file, name, transformFunc ){
		this.loader.loadModel( file, name, transformFunc );
	}

	loadShader( file, name ){
		this.loader.loadShader( file, name );
	}

	loadTexture( file, name ){
		this.loader.loadTexture( file, name );
	}

	play(){
		THREE.Cache.enabled = true;

		this.loader = new MyLoader(this);

		this.init(this);

		this.loader.mainIsLoaded();
	}
}

function animate(){
	projectRef.animate();

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}