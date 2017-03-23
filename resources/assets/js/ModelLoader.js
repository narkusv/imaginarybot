global.jQuery = require('jquery');

var $ = global.jQuery;
window.$ = $;
  
 var scene, camera, renderer, controls;
 var container;
  function init(){
    container = $("#ModelContainer");
    scene = new THREE.Scene();
    var WIDTH = container.width(),
        HEIGHT = WIDTH;

          renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(WIDTH, HEIGHT);
    container.append(renderer.domElement);

     camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 2000);
    camera.position.set(0,0,250);
    scene.add(camera);

      window.addEventListener('resize', function() {
      var WIDTH = container.width(),
          HEIGHT = WIDTH;
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


      var keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
      keyLight.position.set(-400, 0, 400);



      var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
      backLight.position.set(400, 0, -400).normalize();

      scene.add(keyLight);
      scene.add(backLight);

    var loader = new THREE.OBJLoader();
    var loader = new THREE.OBJLoader( manager );
        loader.load( 'l.obj', function ( object ) {
          
          scene.add( object );
          object.position.y = -95;
        }, onProgress, onError );
       // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

  }

  function animate(){

     // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);
 
    // Render the scene.
    renderer.render(scene, camera);
    controls.update();
  }
$( document ).ready(function() {

  init();
  animate();
});
