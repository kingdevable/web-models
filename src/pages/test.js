let camera, scene, renderer, box;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;
		
		scene = new THREE.Scene();
		
		//plane

		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'https://i.imgur.com/sJwKYvZ.jpg' );

    const geometry = new THREE.PlaneGeometry();
    const material = new THREE.MeshBasicMaterial( { alphaMap: texture, alphaTest: 0.5 } );

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
		
		// box
		
		const boxGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const boxMaterial = new THREE.MeshNormalMaterial();
		
		box = new THREE.Mesh( boxGeometry, boxMaterial );
		box.position.z = - 1;
		scene.add( box );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
		
	 	const controls = new THREE.OrbitControls( camera, renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );
		
    box.rotation.x += 0.01;
    box.rotation.y += 0.02;
		
    renderer.render( scene, camera );

}