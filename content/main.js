/////////////////////////////////////
///////// 3D drawing basics /////////
/////////////////////////////////////

function main() {

	// Set the scene size
	const WIDTH = window.innerWidth;
	const HEIGHT = window.innerHeight;

	// Set some camera attributes
	const VIEW_ANGLE = 45;
	const ASPECT = WIDTH / HEIGHT;
	const NEAR = 0.1;
	const FAR = 10000;

	// array of actors to keep track of spheres
	var actors = [];

	// get the DOM element to attach to
	const container = document.querySelector('#container');

	// Sphere Variables
	var qual = document.getElementById("quality").value;
	var oldQual = qual;

	var radius = 50;
	var segments = qual;
	var rings = qual;

	console.log(qual);

	// Create a WebGL renderer, camera and a scene
	const renderer = new THREE.WebGLRenderer();
	const camera = 
		new THREE.PerspectiveCamera(
			VIEW_ANGLE,
			ASPECT,
			NEAR,
			FAR
		);

	const scene = new THREE.Scene();

	meshes();

	// add the camera to the scene
	scene.add(camera);

	// Start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the renderer-supplied DOM element
	container.appendChild(renderer.domElement);

	console.log("done scene");

	/////// Light ///////

	// create a point light
	const pointLight =
		new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// add to the scene
	scene.add(pointLight);

	console.log("done lights");

	function meshes() {

		/////// Sphere ///////

		const sphereColor = 0xCC0000;

		// create the sphere's material
		const sphereMaterial = 
			new THREE.MeshLambertMaterial(
			{
				color: sphereColor
			});

		const sphereGeo = new THREE.SphereGeometry(
				radius,
				segments,
				rings);

		// create a new mesh with sphere geometry
		const sphere = new THREE.Mesh(
			sphereGeo,
			sphereMaterial);

		// Move the sphere back in Z so we can see it
		sphere.position.z = -300;
		sphere.position.x = -100;

		// Finally add the sphere to the scene		
		scene.add(sphere);
		actors.push(sphere);
			
		console.log("done sphere");

		/////// wireframe sphere ///////
		const wireGeo = new THREE.EdgesGeometry(sphereGeo);
		
		const wireMat = new THREE.LineBasicMaterial({
			color: sphereColor,
			linewidth: 3
		});

		const sphereWire = new THREE.LineSegments(wireGeo, wireMat);

		sphereWire.position.z = -300;
		sphereWire.position.x = 100;

		// add wireframe to the scene
		scene.add(sphereWire);
		actors.push(sphereWire);
	}


	/////// DRAW ///////

	// draw
	function update() {
		// rotate the sphere
		renderer.render(scene, camera);

		// turn spheres
		spinActors();

		// check for quality change (must be a better way to do this)
		qual = document.getElementById("quality").value;
		if (qual !== oldQual) {
			changeQuality();
			oldQual = qual;
		}

		// schedule nest frame.
		requestAnimationFrame(update);
	}

	// Schedule the first frame
	requestAnimationFrame(update);

	console.log("done draw");

	// spin all actors
	function spinActors() {
		for (var i = 0; i < actors.length; ++i) {
			spin(actors[i]);
		}
	}

	// rotate sphere //
	function spin(mesh) {

		// need to find amount to rotate every frame
		// want speed of rotSpeed every second @ 60fps
		var degSpeed = document.getElementById("rotSpeed").value;
		var radSpeed = (degSpeed > 360 ? 360 : degSpeed)*Math.PI/180.0;
		var dTheta = radSpeed/60;

		mesh.rotation.y += dTheta;
	}
	
	// change quality
	function changeQuality() {
		for (var i = actors.length -1; i >=0 ; --i) {
			scene.remove(actors.pop());
			console.log("wowza");
		}
		segments = qual;
		rings = qual;
		meshes();
	}

	// window resize
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
}