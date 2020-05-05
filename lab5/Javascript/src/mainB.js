let scene, camera, renderer, light;

let mesh;

function mainB() {

	const main = new Project(
		function(main){
			// setup the scene
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);
			camera.position.z = 60;
		},

		function(main){
			particles.forEach(p => {
				p.velocity.add(p.acceleration);
				p.position.add(p.velocity);
			});
			mesh.geometry.verticesNeedUpdate = true;

		},

		function(main){
			particles = [];
			const geo = new THREE.Geometry();
			for(let i=0; i<1000; i++) {
				const particle = {
					position: new THREE.Vector3(
						Math.random() * 2 - 1,
						Math.random() * 2 - 1,
						Math.random() * 3 - 3
					),
					velocity: new THREE.Vector3(
						Math.random() * .02 - .01,
						0.06,
						Math.random() * .02 - .01
					),
					acceleration: new THREE.Vector3(
						Math.random() * .002 - .001, 
						Math.random() * .002 - .001, 
						0
					),
				}
				particles.push(particle);
				geo.vertices.push(particle.position)
			}

			const particleMat = new THREE.PointsMaterial({color:0xffffff,size: 0.5});
			mesh = new THREE.Points(geo,particleMat);
			mesh.position.z = -4;
			scene.add(mesh);
		}
	);

	main.play();
}

