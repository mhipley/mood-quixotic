

/*
    Three.js "tutorials by example"
    Author: Lee Stemkoski
    Date: July 2013 (three.js v59dev)
*/
// MAIN
// standard global variables
var container, scene, camera, renderer, controls, stats;
// var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var Box;
init();
animate();


// FUNCTIONS        
function init() 
{

    var d = new Date();
    var n = d.getHours();
    console.log(n);
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = 638, SCREEN_HEIGHT = 534;
    var VIEW_ANGLE = 450, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

    camera.position.set(0,-150,325);
    scene.add(camera);
    camera.lookAt(0, 0, 0);  

    renderer = new THREE.WebGLRenderer(); 
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById( 'ThreeJS' );
    container.appendChild( renderer.domElement );
    // // EVENTS
    // THREEx.WindowResize(renderer, camera);
    // THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
    
    // CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enabled = false;
    controls.minDistance = 0;
    controls.maxDistance = 420;
    controls.minPolarAngle =  Math.PI / 3 ; // radians
    controls.maxPolarAngle = Math.PI / 2;
    controls.minAzimuthAngle = - Math.PI / 8; // radians
    controls.maxAzimuthAngle = Math.PI / 8; // radians

    // LIGHT
    var light = new THREE.PointLight(0xffffff, 1.1);
    light.position.set(0,250,0);
    scene.add(light);

    ////////////
    // CUSTOM //
    ////////////

    
    var imagePrefix = "/mood_quixotic/img/edi_";
    var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    var imageSuffix = ".png";
    var skyGeometry = new THREE.BoxGeometry( 1200, 1000, 700 );   

    var materialArray = [];
    for (var i = 0; i < 6; i++)
        materialArray.push( new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load( imagePrefix + directions[i] + imageSuffix ),
            transparent:true, 
            overdraw: true,
            side: THREE.BackSide

        }));
    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    scene.add( skyBox );


    //BED

    var bedTopGeometry = new THREE.PlaneGeometry( 350, 700 );
    var bedTexture = new THREE.TextureLoader().load( imagePrefix + "bed_tile" + imageSuffix );
    var bedMaterial = new THREE.MeshLambertMaterial( {
        map: bedTexture,
        overdraw: true,
    } );
    var bedTop = new THREE.Mesh( bedTopGeometry, bedMaterial );
    bedTop.position.set(-425,-249,0);
    bedTop.rotation.x = - Math.PI / 2;
    scene.add( bedTop );

    var bedSide = new THREE.Mesh( bedTopGeometry.clone(), bedMaterial );

    bedSide.rotation.x = - Math.PI / 2;
    bedSide.rotation.y =  Math.PI / 2;
    bedSide.position.set(-225,-450,0);

    scene.add ( bedSide );

    var bedEdgeGeometry = new THREE.CylinderGeometry( 25, 25, 700, 32, false );
    var bedEdge = new THREE.Mesh( bedEdgeGeometry, bedMaterial );
    bedEdge.rotation.x = - Math.PI / 2;
    bedEdge.position.set(-251,-275,0);
    // bedSide.rotation.y =  Math.PI / 2;
    scene.add( bedEdge );

    // PILLOW 

    var pillowTopGeometry = new THREE.PlaneGeometry( 300, 150 );
    var pillowTexture = new THREE.TextureLoader().load( imagePrefix + "pillow_tile" + imageSuffix );
    var pillowMaterial = new THREE.MeshLambertMaterial( {
        map: pillowTexture,
        overdraw: true,
    } );
    var pillowTop = new THREE.Mesh( pillowTopGeometry, pillowMaterial );
    pillowTop.position.set(-412.5,-199,-220);
    pillowTop.rotation.x = - Math.PI / 2;
    scene.add( pillowTop );

    var pillowFrontEdgeGeometry = new THREE.CylinderGeometry( 25, 25, 300, 32, false );
    var pillowFrontEdge = new THREE.Mesh( pillowFrontEdgeGeometry, pillowMaterial );
    pillowFrontEdge.rotation.x = - Math.PI / 2;
    pillowFrontEdge.rotation.x = - Math.PI / 2;
    pillowFrontEdge.position.set(-412.5,-225,-145);
    pillowFrontEdge.rotation.z =  Math.PI / 2;
    scene.add( pillowFrontEdge );   

    var pillowBackEdge = new THREE.Mesh( pillowFrontEdgeGeometry.clone(), pillowMaterial );
    pillowBackEdge.rotation.x = - Math.PI / 2;
    pillowBackEdge.rotation.x = - Math.PI / 2;
    pillowBackEdge.position.set(-412.5,-225,-295);
    pillowBackEdge.rotation.z =  Math.PI / 2;
    scene.add( pillowBackEdge );        

    var pillowSideGeometry = new THREE.PlaneGeometry( 50, 150 );
    var pillowSide = new THREE.Mesh( pillowSideGeometry, pillowMaterial );
    pillowSide.rotation.x = - Math.PI / 2;
    pillowSide.rotation.y =  Math.PI / 2;
    pillowSide.position.set(-262.5, -225,-220);
    scene.add( pillowSide );

    // SHELVES

    var bookshelfGeometry = new THREE.BoxGeometry(300, 10, 100);
    var bookshelfTexture = new THREE.TextureLoader().load( imagePrefix + "shelf" + imageSuffix );
    var bookshelfMaterial = new THREE.MeshLambertMaterial( {
        map: bookshelfTexture,
        overdraw: true,
    } );
    var bookshelf1 = new THREE.Mesh(bookshelfGeometry, bookshelfMaterial );
    bookshelf1.position.set(-20, 50,-310);
    scene.add( bookshelf1 );
    var bookshelf2 = new THREE.Mesh(bookshelfGeometry, bookshelfMaterial );
    bookshelf2.position.set(-20, -50,-310);
    scene.add( bookshelf2 );
    var bookshelf3 = new THREE.Mesh(bookshelfGeometry.clone(), bookshelfMaterial );
    bookshelf3.position.set(-20, -150,-310);
    scene.add( bookshelf3 );

    // WINDOW SCENE

    var moonGeometry = new THREE.PlaneGeometry( 59, 59 );
    var moonTexture = new THREE.TextureLoader().load( imagePrefix + "moon_03" + imageSuffix );
    var moonMaterial = new THREE.MeshBasicMaterial( {
        map: moonTexture,
        transparent:true, 
        overdraw: true,
    } );
    var moon = new THREE.Mesh(moonGeometry, moonMaterial );
    moon.position.set(-410, 195, -410);
    

    var treeGeometry = new THREE.PlaneGeometry( 344, 392 );
    var treeTexture = new THREE.TextureLoader().load( imagePrefix + "branch" + imageSuffix );
    var treeMaterial = new THREE.MeshBasicMaterial( {
        map: treeTexture,
        transparent:true, 
        overdraw: true,
    } );
    var tree = new THREE.Mesh(treeGeometry, treeMaterial );
    tree.position.set(-390, 10, -420);

 

    var nightSkyGeometry = new THREE.PlaneGeometry( 800, 800 );
    var nightSkyTexture = new THREE.TextureLoader().load( imagePrefix + "nightsky" + imageSuffix );
    var nightSkyMaterial = new THREE.MeshBasicMaterial( {
        map: nightSkyTexture,
        transparent:true, 
        overdraw: true,
    } );
    var nightSky = new THREE.Mesh(nightSkyGeometry, nightSkyMaterial );
    nightSky.position.set(-790, 120, -700);
   
    var daySkyGeometry = new THREE.PlaneGeometry( 800, 800 );
    var daySkyTexture = new THREE.TextureLoader().load( imagePrefix + "daysky" + imageSuffix );
    var daySkyMaterial = new THREE.MeshBasicMaterial( {
        map: daySkyTexture,
        transparent:true, 
        overdraw: true,
    } );
    var daySky = new THREE.Mesh(daySkyGeometry, daySkyMaterial );
    daySky.position.set(-790, 120, -700);

    // DESK

    var deskGeometry = new THREE.BoxGeometry(350, 10, 200);
    var desk = new THREE.Mesh(deskGeometry, bookshelfMaterial );
    desk.position.set(-20, -270, 260);
    scene.add( desk );

    var mouseSideGeometry = new THREE.CylinderGeometry( 24.5, 24.5, 8, 32, 2, true );
    var mouseSideMaterial = new THREE.MeshBasicMaterial( {color: 0x6fafbb} );
    var mouseSide = new THREE.Mesh( mouseSideGeometry, mouseSideMaterial );
    mouseSide.position.set(-80, -260, 220);
    scene.add( mouseSide );

    var mouseTopGeometry = new THREE.PlaneGeometry( 49, 49 );
    var mouseTopTexture = new THREE.TextureLoader().load( imagePrefix + "mouse" + imageSuffix );
    var mouseTopMaterial = new THREE.MeshLambertMaterial( {
        map: mouseTopTexture,
        transparent:true,
        overdraw: true,
    } );
    var mouseTop = new THREE.Mesh( mouseTopGeometry, mouseTopMaterial );
    mouseTop.position.set(-80, -256, 220);
    mouseTop.rotation.x = -  Math.PI / 2;
    scene.add( mouseTop );

    var keyboardGeometry = new THREE.PlaneGeometry( 120, 71);
    var keyboardTexture = new THREE.TextureLoader().load( imagePrefix + "keyboard" + imageSuffix );
    var keyboardMaterial = new THREE.MeshLambertMaterial( {
        map: keyboardTexture,
        transparent:true,
        overdraw: true,
    } );
    var keyboard = new THREE.Mesh( keyboardGeometry, keyboardMaterial );
    keyboard.position.set(60, -256, 300);
    keyboard.rotation.x = -  Math.PI / 2;
    scene.add( keyboard );

    var spineColor = 0x516983;
    var cdGeometry = new THREE.BoxGeometry(75, 75, 10);
    var cdMaterial = new THREE.MeshBasicMaterial( {color: spineColor} );
    var cd = new THREE.Mesh( cdGeometry, cdMaterial );
    cd.rotation.x = -  Math.PI / 2;
    cd.rotation.z = -  Math.PI / 8;
    cd.position.set(20, -256, 220);
    scene.add(cd);

    var cdCoverGeometry = new THREE.PlaneGeometry( 75, 75);
    var cdCoverTexture = new THREE.TextureLoader().load( imagePrefix + "cd_kida" + imageSuffix );
    var cdCoverMaterial = new THREE.MeshBasicMaterial( {
        map: cdCoverTexture,
        overdraw: true,
    } );
    var cdCover = new THREE.Mesh( cdCoverGeometry, cdCoverMaterial );
    cdCover.rotation.x = -  Math.PI / 2;
    cdCover.rotation.z =  - (Math.PI) - (Math.PI / 8) ;
    cdCover.position.set(20, -250, 220);
    scene.add(cdCover);




    document.getElementById('reset').addEventListener('click', resetcamera);
    document.getElementById('zoom_in').addEventListener('click', zoomIn);
    document.getElementById('zoom_out').addEventListener('click', zoomOut);
    document.getElementById('tilt_left').addEventListener('click', tiltLeft);
    document.getElementById('tilt_right').addEventListener('click', tiltRight);
    document.getElementById('tilt_up').addEventListener('click', tiltUp);
    document.getElementById('tilt_down').addEventListener('click', tiltDown);
    document.getElementById('pan_horiz').addEventListener('click', panHoriz);
    document.getElementById('pan_vert').addEventListener('click', panVert);

    if (n > 6 && n < 20){
        scene.add( tree );
        scene.add( daySky ); 
        
    }

    else {
        scene.add( moon ); 
        scene.add( tree ); 
        scene.add( nightSky ); 

    }


            //RUG

    var rugGeometry = new THREE.PlaneGeometry ( 250, 344 );
    var rugTexture = new THREE.TextureLoader().load( imagePrefix + "rug" + imageSuffix );
    var rugMaterial = new THREE.MeshLambertMaterial( {
        map: rugTexture,
        overdraw: true,
    } );
    rugMaterial.alphaTest = 0.5;
    var rug = new THREE.Mesh( rugGeometry, rugMaterial );
    rug.rotation.x = - Math.PI / 2;
    rug.position.set (-70, -499, -50);
    rug.rotation.z = Math.PI / 8;
    scene.add (rug);
    

}
function animate() 
{
    requestAnimationFrame( animate );
    render();       
    update();
}

function resetcamera() {

    camera.position.set(0,-150,325);

}

function panHoriz() {

    camera.translateX( 400 );
    for (var i = 1; i < 8; i++) {
        var time = i * 1000;
        setTimeout(ticRight, time);
    }

}

function panVert() {

    camera.translateY( -9000 );
    for (var i = 1; i < 7; i++) {
        var time = i * 1000;
        setTimeout(ticDown, time);
    }

}

function ticRight() {
    camera.translateX( -50 );
}

function ticDown() {
    camera.translateY( +50 );
}


function zoomIn() {
    camera.translateZ( -50 );
}

function zoomOut() {
    camera.translateZ( +50 );
}

function tiltLeft() {
    camera.translateX( +50 );
}

function tiltRight() {
    camera.translateX( -50 );
}

function tiltUp() {
    camera.translateY( -50 );
}

function tiltDown() {
    camera.translateY( +50 );
}

function update()
{
    // if ( keyboard.pressed("z") ) 
    // { 
    //     // do something
    // }
    
    controls.update();

}
function render() 
{
    renderer.render( scene, camera );
}



