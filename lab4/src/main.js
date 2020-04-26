
function main() {
	THREE.Cache.enabled = true;
	var count = 0;
	var loader = new THREE.FileLoader();
	var fshader, vshader;

	var geometry1, material1, mesh1;

	function addTextureShaderCube() {
		if(count == 2) {
			var uniforms = {texture1: {
				type: "t",
				value: THREE.ImageUtils.loadTexture("textures/156.jpg")
			}};

      		geometry1 = new THREE.BoxGeometry(1, 1, 1);
      		material1 =  new THREE.ShaderMaterial({
            		uniforms: uniforms,
      			fragmentShader: fshader,
              		vertexShader: vshader,
      			precision: "mediump"});

      		mesh1 = new THREE.Mesh(geometry1, material1);
      		mesh1.position.x = 2;
      		scene.add(mesh1);
    	}
	}


	loader.load('shaders/vertexShader.vert',
	// onLoad callback
	function (data) {
		console.log(data); // output the text to the console
		vshader = data;
		count += 1;
		addTextureShaderCube(); // we will write this method
	},
	// onProgress callback
	function (xhr) {
		console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
	},
	// onError callback
	function (err) {
		console.error('An error happened');
	});

	loader.load('shaders/colorInterpolate.frag',
	// onLoad callback
	function (data) {
		console.log(data); // output the text to the console
		fshader = data;
		count += 1;
		addTextureShaderCube(); // we will write this method
	},
	// onProgress callback
	function (xhr) {
		console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
	},
	// onError callback
	function (err) {
		console.error('An error happened');
	});


	// setup the scene
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, 
	window.innerWidth/window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 5;

	// import textures
	var texture156 = THREE.ImageUtils.loadTexture("textures/156.jpg");
	var normMap156 = THREE.ImageUtils.loadTexture("textures/156_norm.jpg");
	var texture163 = THREE.ImageUtils.loadTexture("textures/163.jpg");
	var normMap163 = THREE.ImageUtils.loadTexture("textures/163_norm.jpg");

	// setup the cube
	var geometry = new THREE.BoxGeometry();
	var material = new THREE.MeshPhongMaterial( {
		map: texture156,
		normalMap: normMap156
	} );
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	var material2 = new THREE.MeshPhongMaterial( { map: texture156 });
	var cube2 = new THREE.Mesh(geometry, material2);
	scene.add(cube2);
	cube2.position.x -= 2;

	var material3 = new THREE.MeshPhongMaterial( {
		map: texture163,
		normalMap: normMap163
	});
	var cube2 = new THREE.Mesh(geometry, material3);
	scene.add(cube2);
	cube2.position.x += 2;


	// add the light
	var light = new THREE.PointLight(0xffffff, 1, 1000);
	light.position.set(0, 10, 10);
	scene.add(light);

	function animate() {
		light.translateZ( -10 );
		light.rotation.y -= .1;
		light.translateZ( 10 );

		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}
	animate();
}