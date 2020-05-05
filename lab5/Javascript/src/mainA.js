let scene, camera, renderer, light;
let particleMat;

let mouseX, mouseY;

function mainA() {

	const main = new Project(
		function(main){
			main.loadTexture( "textures/disc.png", 'disc');

			// setup the scene
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);
			camera.position.z = 60;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			mouseX = 0;
			mouseY = 0;

			function onDocumentMouseMove(event) {
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}

			function onDocumentTouchStart(event) {
				if (event.touches.length == 1) {
					event.preventDefault();
					mouseX = event.touches[0].pageX - windowHalfX;
					mouseY = event.touches[0].pageY - windowHalfY;
				}
			}

			function onDocumentTouchMove(event) {
				if (event.touches.length == 1) {
					event.preventDefault();
					mouseX = event.touches[0].pageX - windowHalfX;
					mouseY = event.touches[0].pageY - windowHalfY;
				}
			}

			document.addEventListener('mousemove', onDocumentMouseMove, false);
			document.addEventListener('touchstart', onDocumentTouchStart, false);
			document.addEventListener('touchmove', onDocumentTouchMove, false);
		},

		function(main){
			var time = Date.now() * 0.00005;
			var h = (360 * (1.0 + time) % 360) / 360;
			particleMat.color.setHSL(h, 0.5, 0.5);

			camera.position.x += (mouseX - camera.position.x) * 0.0005;
			camera.position.y += (-mouseY - camera.position.y) * 0.0005;
		},

		function(main){
			var vertices = [];

			for ( var i = 0; i < 1000; i ++ ) {
				var x = THREE.MathUtils.randFloatSpread( 500 );
				var y = THREE.MathUtils.randFloatSpread( 500 );
				var z = THREE.MathUtils.randFloatSpread( 100 );
				vertices.push( x, y, z );
			}

			var geometry = new THREE.BufferGeometry();
			geometry.setAttribute( 'position', new 
			THREE.Float32BufferAttribute(vertices, 3));

			particleMat = new THREE.PointsMaterial( { size: 20, sizeAttenuation: false, map: textures.disc, alphaTest: 0.5, transparent: true } );
			particleMat.color.setHSL( 1.0, 0.3, 0.7 );

			var points = new THREE.Points(geometry, particleMat);
			scene.add(points);
		}
	);

	main.play();
}