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

	// get the DOM element to attach to
	const container = document.querySelector('#container');

	// Sphere Variables
	const radius = 50;
	const segments = 8;
	const rings = 8;

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

	// add the camera to the scene
	scene.add(camera);

	// Start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the renderer-supplied DOM element
	container.appendChild(renderer.domElement);

	console.log("done scene");


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


	/////// DRAW ///////

	// draw
	function update() {
		// rotate the sphere
		renderer.render(scene, camera);

		// turn spheres
		turn(sphere);
		turn(sphereWire);

		// schedule nest frame.
		requestAnimationFrame(update);
	}

	// Schedule the first frame
	requestAnimationFrame(update);

	console.log("done draw");

	// rotate sphere //
	function turn(mesh) {

		// need to find amount to rotate every frame
		// want speed of rotSpeed every second @ 60fps
		var degSpeed = document.getElementById("rotSpeed").value;
		var radSpeed = (degSpeed > 360 ? 360 : degSpeed)*Math.PI/180.0;
		var dTheta = radSpeed/60;

		mesh.rotation.y += dTheta;
	}

	// window resize
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
}