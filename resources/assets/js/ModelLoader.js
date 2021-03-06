global.jQuery = require('jquery');

var $ = global.jQuery;
window.$ = $;
  
var scene, camera, renderer, controls;
var container, head;
var ROTATION_SPEED = 0.01;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


  function init(){
    container = $("#ModelContainer");
    scene = new THREE.Scene();
    var WIDTH = container.width(),
        HEIGHT = WIDTH*1.5;

      renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
      renderer.setSize(WIDTH, HEIGHT);
      container.append(renderer.domElement);

      camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 2000);
      camera.position.set(0,0,250);
      scene.add(camera);

      window.addEventListener('resize', function() {
      var WIDTH = container.width(),
          HEIGHT = WIDTH*1.5;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });

renderer.setClearColor( 0x000000, 0 ); // the default 
 

    var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
          console.log( item, loaded, total );
        };
        var texture = new THREE.Texture();
        var onProgress = function ( xhr ) {
          if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
          }
        };
        var onError = function ( xhr ) {
          console.log('err')
        };


    var ambient = new THREE.AmbientLight( 0xffffff );
        scene.add( ambient );
        ambient.intensity = 1;


   
        var loader = new THREE.ImageLoader( manager );
        loader.load( 'galva.jpg', function ( image ) {

          texture.image = image;
          texture.needsUpdate = true;

        } );

        // model
        

        var loader = new THREE.OBJLoader( manager );
        loader.load( 'baltas.obj', function ( object ) {
          head = object;
          head.scale.set(1.1, 1.1, 1.1);
          head.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

              child.material.map = texture;

            }

          } );

          head.position.y = - 95;
          scene.add( head );


        }, onProgress, onError );


       // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

  }


  function rotateCube() {
      head.rotation.y -= ROTATION_SPEED;
  }

  function animate(){
     // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimFrame(animate);

    // Render the scene.
    renderer.render(scene, camera);
    controls.update();
    rotateCube();


  }

  function render(){
    console.log("render is called");
  }
$( document ).ready(function() {

  init();
  animate();
});
