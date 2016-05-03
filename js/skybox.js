

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
    var m = d.getDate();
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
    //MOON STUFF
    if (m > 3 && m < 8) {
        //full
        var moonSuffix = "full";
    }

    else if (m > 7 && m < 10) {
        //waning gibbous
        var moonSuffix = "wangib";
    }

    else if (m > 9 && m < 13) {
        //last quarter (looks half)
        var moonSuffix = "lastq";
    }

    else if (m > 12 && m < 18) {
        //waning crescent
        var moonSuffix = "wancres";
    }

    else if (m > 17 && m < 21) {
        //no moon
        var moonSuffix = "no";
    }

    else if (m > 20 && m < 26) {
        //waxing crescent
        var moonSuffix = "waxcres";
    }

    else if (m > 25 && m < 29) {
        //first quarter
        var moonSuffix = "firstq";
    }

    else {
        //waxing gibbous
        var moonSuffix = "waxgib";
    }    

    var moonTexture = new THREE.TextureLoader().load( imagePrefix + "moon_" + moonSuffix + imageSuffix );
    var moonMaterial = new THREE.MeshBasicMaterial( {
        map: moonTexture,
        transparent:true, 
        overdraw: true,
    } );
    var moon = new THREE.Mesh(moonGeometry, moonMaterial );
    moon.position.set(-410, 195, -410);

    // PLANTS

    // var budGeometry = new THREE.PlaneGeometry(30, 31);
    // var budTexture = new THREE.TextureLoader().load( imagePrefix + "bud" + imageSuffix );
    // var budMaterial = new THREE.MeshBasicMaterial( {
    //     map: budTexture,
    //     transparent:true, 
    //     overdraw: true,
    // } );
    // budMaterial.alphaTest = 0.5;
    // var bud = new THREE.Mesh(budGeometry, budMaterial );
    // bud.position.set(-415, 135, -419);
    // bud.rotation.z = - Math.PI / 8;
    // scene.add(bud);

    var leaf1Geometry = new THREE.PlaneGeometry(30, 31);
    var leaf1Texture = new THREE.TextureLoader().load( imagePrefix + "leaf1" + imageSuffix );
    var leaf1Material = new THREE.MeshBasicMaterial( {
        map: leaf1Texture,
        transparent:true, 
        overdraw: true,
    } );
    leaf1Material.alphaTest = 0.5;
    var leaf1 = new THREE.Mesh(leaf1Geometry, leaf1Material );
    leaf1.position.set(-495, 220, -419);
    leaf1.rotation.z = - Math.PI / 8;
    // scene.add(leaf1);    

    var leaf2Geometry = new THREE.PlaneGeometry(30, 22);
    var leaf2Texture = new THREE.TextureLoader().load( imagePrefix + "leaf2" + imageSuffix );
    var leaf2Material = new THREE.MeshBasicMaterial( {
        map: leaf2Texture,
        transparent:true, 
        overdraw: true,
    } );
    leaf2Material.alphaTest = 0.5;
    var leaf2 = new THREE.Mesh(leaf2Geometry, leaf2Material );
    leaf2.position.set(-565, 200, -419);
    leaf2.rotation.z =  Math.PI / 8;
    // scene.add(leaf2);     

    var leaf3Geometry = new THREE.PlaneGeometry(30, 73);
    var leaf3Texture = new THREE.TextureLoader().load( imagePrefix + "leaf3" + imageSuffix );
    var leaf3Material = new THREE.MeshBasicMaterial( {
        map: leaf3Texture,
        transparent:true, 
        overdraw: true,
    } );
    leaf3Material.alphaTest = 0.5;
    var leaf3 = new THREE.Mesh(leaf3Geometry, leaf3Material );
    leaf3.position.set(-365, 60, -419);
    leaf3.rotation.z = - Math.PI / 8;

    var leaf4Geometry = new THREE.PlaneGeometry(40, 43);
    var leaf4Texture = new THREE.TextureLoader().load( imagePrefix + "leaf4" + imageSuffix );
    var leaf4Material = new THREE.MeshBasicMaterial( {
        map: leaf4Texture,
        transparent:true, 
        overdraw: true,
    } );
    leaf4Material.alphaTest = 0.5;
    var leaf4 = new THREE.Mesh(leaf4Geometry, leaf4Material );
    leaf4.position.set(-455, 12, -419);
    leaf4.rotation.z = - Math.PI / 8;

    var leaf5Geometry = new THREE.PlaneGeometry(50, 30);
    var leaf5Texture = new THREE.TextureLoader().load( imagePrefix + "leaf5" + imageSuffix );
    var leaf5Material = new THREE.MeshBasicMaterial( {
        map: leaf5Texture,
        transparent:true, 
        overdraw: true,
    } );
    leaf5Material.alphaTest = 0.5;
    var leaf5 = new THREE.Mesh(leaf5Geometry, leaf5Material );
    leaf5.position.set(-525, 150, -419);
    leaf5.rotation.z = - Math.PI / 8;

    var leaf6Geometry = new THREE.PlaneGeometry(30, 38);
    var leaf6Texture = new THREE.TextureLoader().load( imagePrefix + "leaf6" + imageSuffix );
    var leaf6Material = new THREE.MeshBasicMaterial( {
        map: leaf6Texture,
        transparent:true, 
        overdraw: true,
    } );
    leaf6Material.alphaTest = 0.5;
    var leaf6 = new THREE.Mesh(leaf6Geometry, leaf6Material );
    leaf6.position.set(-505, 170, -419);
    leaf6.rotation.z = 0;

    var leaf7Geometry = new THREE.PlaneGeometry(50, 46);
    var leaf7Texture = new THREE.TextureLoader().load( imagePrefix + "leaf7" + imageSuffix );
    var leaf7Material = new THREE.MeshBasicMaterial( {
        map: leaf7Texture,
        transparent:true, 
        overdraw: true,
    } );
    leaf7Material.alphaTest = 0.5;
    var leaf7 = new THREE.Mesh(leaf7Geometry, leaf7Material );
    leaf7.position.set(-565, 200, -419);
    leaf7.rotation.z = 0;            


    // scene.add(leaf3);        

if (m > 0 && m < 10) {
    var flowerSuffix = "_1";
}

if (m >= 10 && m < 20) {
    var flowerSuffix = "_2";
    scene.add(leaf1);  
    scene.add(leaf2);  
    scene.add(leaf3);  
    scene.add(leaf4);  
    scene.add(leaf5);     
}

if (m >= 20 && m < 32) {
    var flowerSuffix = "_3";
    scene.add(leaf1);  
    scene.add(leaf3);   
    scene.add(leaf4);  
    scene.add(leaf5); 
    scene.add(leaf6);  
    scene.add(leaf7);          
}

    var flowerGeometry = new THREE.PlaneGeometry(77, 50);
    var flowerTexture = new THREE.TextureLoader().load( imagePrefix + "flower" + flowerSuffix + imageSuffix );
    var flowerMaterial = new THREE.MeshBasicMaterial( {
        map: flowerTexture,
        transparent:true, 
        overdraw: true,
    } );
    flowerMaterial.alphaTest = 0.5;
    var flower = new THREE.Mesh(flowerGeometry, flowerMaterial );
    flower.position.set(-410, 120, -419);
    flower.rotation.z = - Math.PI / 8;
    scene.add(flower);            

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
    mouseSide.position.set(-90, -260, 230);
    scene.add( mouseSide );

    var mouseTopGeometry = new THREE.PlaneGeometry( 49, 49 );
    var mouseTopTexture = new THREE.TextureLoader().load( imagePrefix + "mouse" + imageSuffix );
    var mouseTopMaterial = new THREE.MeshLambertMaterial( {
        map: mouseTopTexture,
        transparent:true,
        overdraw: true,
    } );
    var mouseTop = new THREE.Mesh( mouseTopGeometry, mouseTopMaterial );
    mouseTop.position.set(-90, -256, 230);
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
    cd.rotation.z = -  Math.PI / 8 + Math.PI / 2;
    cd.position.set(-50, -135, -300);
    scene.add(cd);

    var cdCoverGeometry = new THREE.PlaneGeometry( 75, 75);
    var cdCoverTexture = new THREE.TextureLoader().load( imagePrefix + "cd_kida" + imageSuffix );
    var cdCoverMaterial = new THREE.MeshBasicMaterial( {
        map: cdCoverTexture,
        overdraw: true,
    } );
    var cdCover = new THREE.Mesh( cdCoverGeometry, cdCoverMaterial );
    cdCover.rotation.x = -  Math.PI / 2;
    cdCover.rotation.z =  - (Math.PI) - (Math.PI / 8) + Math.PI / 2;
    cdCover.position.set(-50, -129, -300);
    scene.add(cdCover);

    var cd2 = new THREE.Mesh( cdGeometry.clone(), cdMaterial );
    cd2.rotation.x = -  Math.PI / 2;
    cd2.rotation.z =  Math.PI / 8 + Math.PI / 2;
    cd2.position.set(80, -135, -310);
    scene.add(cd2);


    var cdCoverTexture2 = new THREE.TextureLoader().load( imagePrefix + "cd_blur" + imageSuffix );
    var cdCoverMaterial2 = new THREE.MeshBasicMaterial( {
        map: cdCoverTexture2,
        overdraw: true,
    } );
    var cdCover2 = new THREE.Mesh( cdCoverGeometry.clone(), cdCoverMaterial2 );
    cdCover2.rotation.x = -  Math.PI / 2;
    cdCover2.rotation.z =  - (Math.PI) + (Math.PI / 8) + Math.PI / 2 ;
    cdCover2.position.set(80, -129, -310);
    scene.add(cdCover2);    


    var cd3 = new THREE.Mesh( cdGeometry.clone(), cdMaterial );
    cd3.rotation.x = -  Math.PI / 2;
    cd3.rotation.z =  Math.PI / 8 + Math.PI / 2;
    cd3.position.set(100, -251, 210);
    scene.add(cd3);


    var cdCoverTexture3 = new THREE.TextureLoader().load( imagePrefix + "hatful" + imageSuffix );
    var cdCoverMaterial3 = new THREE.MeshBasicMaterial( {
        map: cdCoverTexture3,
        overdraw: true,
    } );
    var cdCover3 = new THREE.Mesh( cdCoverGeometry.clone(), cdCoverMaterial3 );
    cdCover3.rotation.x = -  Math.PI / 2;
    cdCover3.rotation.z =  - (Math.PI) + (Math.PI / 8) + Math.PI / 1 ;
    cdCover3.position.set(100, -245, 210);
    scene.add(cdCover3);    

    var cd4 = new THREE.Mesh( cdGeometry.clone(), cdMaterial );
    cd4.rotation.x = -  Math.PI / 2;
    cd4.rotation.z =  Math.PI / 8 + Math.PI / 2;
    cd4.position.set(-350, -245,-50);
    scene.add(cd4);


    var cdCoverTexture4 = new THREE.TextureLoader().load( imagePrefix + "aeroplane" + imageSuffix );
    var cdCoverMaterial4 = new THREE.MeshBasicMaterial( {
        map: cdCoverTexture4,
        overdraw: true,
    } );
    var cdCover4 = new THREE.Mesh( cdCoverGeometry.clone(), cdCoverMaterial4 );
    cdCover4.rotation.x = -  Math.PI / 2;
    cdCover4.rotation.z =  - (Math.PI) + (Math.PI / 8) + Math.PI / 1 ;
    cdCover4.position.set(-350, -239,-50);
    scene.add(cdCover4);       

    var pennantGeometry = new THREE.PlaneGeometry( 100, 179 );
    var pennantTexture = new THREE.TextureLoader().load( imagePrefix + "pennant" + imageSuffix );
    var pennantMaterial = new THREE.MeshBasicMaterial( {
        map: pennantTexture,
        transparent:true,
        overdraw: true
    } );   
    pennantMaterial.alphaTest = 0.5;
    var pennant = new THREE.Mesh( pennantGeometry, pennantMaterial ); 
    pennant.rotation.y =   Math.PI / 2;
    pennant.position.set(-599, 50, -220);
    scene.add(pennant);

    var akiraGeometry = new THREE.PlaneGeometry( 300, 464 );
    var akiraTexture = new THREE.TextureLoader().load( imagePrefix + "akira" + imageSuffix );
    var akiraMaterial = new THREE.MeshBasicMaterial( {
        map: akiraTexture,
        transparent:true,
        overdraw: true
    } );   
    var akira = new THREE.Mesh( akiraGeometry, akiraMaterial ); 
    akira.rotation.y =   Math.PI / 2;
    akira.position.set(-599, 210, 20);
    scene.add(akira);



    var bookCoverGeometry = new THREE.PlaneGeometry( 75, 136);
    var bookCoverTexture = new THREE.TextureLoader().load( imagePrefix + "naked" + imageSuffix );
    var bookCoverMaterial = new THREE.MeshBasicMaterial( {
        map: bookCoverTexture,
        overdraw: true,
    } );
    var bookCover = new THREE.Mesh( bookCoverGeometry, bookCoverMaterial );
    bookCover.rotation.x = -  Math.PI / 2;
    bookCover.position.set(-390, -238, 90);
    bookCover.rotation.z = -2 * (Math.PI / 8) ;
    scene.add(bookCover);


    var bookSpineColor = 0xfbf3ae;
    var bookGeometry = new THREE.BoxGeometry(75, 136, 13);
    var bookMaterial = new THREE.MeshBasicMaterial( {color: bookSpineColor} );
    var book = new THREE.Mesh( bookGeometry, bookMaterial );
    book.rotation.x = -  Math.PI / 2;
    book.position.set(-390, -245, 90);
    book.rotation.z =  -2 * (Math.PI / 8) ;
    scene.add(book);

    // var book2CoverGeometry = new THREE.PlaneGeometry( 75, 136);
    // var book2CoverTexture = new THREE.TextureLoader().load( imagePrefix + "bukowski" + imageSuffix );
    // var book2CoverMaterial = new THREE.MeshBasicMaterial( {
    //     map: book2CoverTexture,
    //     overdraw: true,
    // } );
    // var book2Cover = new THREE.Mesh( book2CoverGeometry, book2CoverMaterial );
    // book2Cover.rotation.x = -  Math.PI / 2;
    // book2Cover.position.set(-350, -243, -50);
    // book2Cover.rotation.z =  - (Math.PI / 4) ;
    // scene.add(book2Cover);


    // var book2SpineColor = 0xfbf3ae;
    // var book2Geometry = new THREE.BoxGeometry(75, 136, 14);
    // var book2Material = new THREE.MeshBasicMaterial( {color: book2SpineColor} );
    // var book2 = new THREE.Mesh( book2Geometry, book2Material );
    // book2.rotation.x = -  Math.PI / 2;
    // book2.position.set(-350, -251,-50);
    // book2.rotation.z =  - (Math.PI / 4) ;
    // scene.add(book2);

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
        if (m < 18 || m > 20) {
            scene.add( moon ); 
        }
        
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



