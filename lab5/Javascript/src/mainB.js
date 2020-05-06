let scene, camera, renderer, light;

let mesh, particleMat;

function mainB() {

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
		},

		function(main){
			var time = Date.now() * 0.001;
			var h = (360 * (1.0 + time) % 360) / 360;
			particleMat.color.setHSL(h, 0.5, 0.5);
			particles.forEach(p => {
				p.velocity.add(p.acceleration);
				p.position.add(p.velocity);
			});
			mesh.geometry.verticesNeedUpdate = true;

		},

		function(main){
			particleHue = 0;

			particles = [];
			const geo = new THREE.Geometry();
			for(let i=0; i<1000; i++) {
				const randAngle = Math.random() * Math.PI*2;
				const randZ = Math.random() * 2 - 1
				const particle = {
					position: new THREE.Vector3(
						Math.random() * 2 - 1,
						Math.random() * 2 - 1,
						Math.random() * 3 - 3
					),
					//https://math.stackexchange.com/questions/44689/how-to-find-a-random-axis-or-unit-vector-in-3d
					velocity: new THREE.Vector3(
						Math.sqrt(1 - Math.pow(randZ,2)) * Math.cos(randAngle) * .5,
						Math.sqrt(1 - Math.pow(randZ,2)) * Math.sin(randAngle) * .4 + .3,
						randZ * .4 - .01
					),
					acceleration: new THREE.Vector3(
						0, 
						Math.random() * .004 - .008, 
						0
					),
				}
				particles.push(particle);
				geo.vertices.push(particle.position)
			}

			particleMat = new THREE.PointsMaterial({color:0xffffff, size: 0.5, map: textures.disc, transparent: true });
			mesh = new THREE.Points(geo,particleMat);
			mesh.position.z = -4;
			scene.add(mesh);
		}
	);

	main.play();
}