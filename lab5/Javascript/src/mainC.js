let scene, camera, renderer, light;

let mesh, particleMat;

const waveWidth = 120;
const waveZWidth = 40;
const yOffset = 15;

const wavePeriod = .1;
const waveHeight = 10;
const waveTime = .01;

const colorTime = 0.0002;

function mainC() {

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
			const time = Date.now();
			var h = (360 * (1.0 + time * colorTime) % 360) / 360;
			particleMat.color.setHSL(h, 0.5, 0.5);
			particles.forEach(p => {
				p.position.y = Math.sin( wavePeriod * (time * waveTime + p.position.x))*waveHeight - waveHeight/2 + p.yOffset;
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
						Math.random() * waveWidth - waveWidth / 2,
						0,
						Math.random() * waveZWidth - waveZWidth / 2
					),
					yOffset: Math.pow(Math.cos(Math.random()*Math.PI),2) * yOffset - yOffset / 2
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