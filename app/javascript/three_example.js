import * as THREE from 'three'
import * as dat from 'dat.gui'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';


const getScrollbarWidth = () => {
    // Create a temporary div container and append it into the body
    const container = document.createElement('div')
    // Append the container in the body
    document.body.appendChild(container)
    // Force scrollbar on the container
    container.style.overflow = 'scroll'
  
    // Add ad fake div inside the container
    const inner = document.createElement('div')
    container.appendChild(inner)
  
    // Calculate the width based on the container width minus its child width
    const width = container.offsetWidth - inner.offsetWidth;
    // Remove the container from the body
    document.body.removeChild(container)
  
    return width
  };
  
  // Get the scrollbar dimension
  const scrollbarWidth = getScrollbarWidth()


  // Set a custom property with the value we calculated
  document.documentElement.style.setProperty('--scrollbar', `${scrollbarWidth}px`)

var stats = new Stats()
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom )
requestAnimationFrame( animate )



/**
 * Get DOM element
 */

const canvas = document.querySelector('canvas.webgl')
console.log(canvas)

/**
 * Debug
 */
const gui = new dat.GUI()



/**
 * Instantiate a loader
 */

const loader = new GLTFLoader()

loader.load(
    'img/black-rhino.gltf',
    (gltf) =>
    {
    
        const model = gltf.scene.children[0]
		console.log(model)
        model.material = new THREE.MeshStandardMaterial({ 
            color: 0x898989
        })

        const parameters = {
            color: 0x898989
        }
        
        gui
            .addColor(parameters, 'color')
            .onChange(() =>
            {
               model.material.color.set(parameters.color)
             
            })


        const rhino = new THREE.Mesh(model.geometry, model.material)
		scene.add(rhino)
    }
)




/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth - scrollbarWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(15, sizes.width / sizes.height, 0.1, 100)
camera.position.y = 2
camera.position.z = 2
scene.add(camera)

/**
 * Lights
 */

//Point light
const light = new THREE.PointLight( 0xffffff, 1 )
light.position.x = 2
light.position.z = 1
scene.add( light )

//Ambient light
const ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add(ambientLight)


//Enable mouse control
//const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true


/**
 * Calculate mouse position
 */
const mouse = new THREE.Vector2()
mouse.x = 0
mouse.y = 1
const target = new THREE.Vector2()
canvas.addEventListener("mousemove", onMouseMove, false)

function onMouseMove(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 2.2
    //console.log (pointOfIntersection)
}


/**
 * Add axes helper - remove in production 
 */
//const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer( {
	antialias: true,
	canvas: canvas

} )

renderer.setSize( sizes.width, sizes.height )


/**
 * Handle window resize
 */

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth - scrollbarWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Postprocessing
 */


const renderScene = new RenderPass( scene, camera )


const bokehPass = new BokehPass( scene, camera, {
    focus: 10.0,
    aperture: 20,
    maxblur: 0.02,

    width: sizes.width,
    height: sizes.height
} );


const effectController = {

    focus: 10.0,
    aperture: 20,
    maxblur: 0.02

};

const matChanger = function ( ) {

    bokehPass.uniforms[ "focus" ].value = effectController.focus
    bokehPass.uniforms[ "aperture" ].value = effectController.aperture * 0.00001
    bokehPass.uniforms[ "maxblur" ].value = effectController.maxblur

};


gui.add( effectController, "focus", 10.0, 50.0, 1 ).onChange( matChanger )
gui.add( effectController, "aperture", 0, 30, 0.1 ).onChange( matChanger )
gui.add( effectController, "maxblur", 0.0, 0.04, 0.001 ).onChange( matChanger )

matChanger();


const composer = new EffectComposer( renderer )

composer.setSize( window.innerWidth, window.innerHeight )
composer.addPass( renderScene )
composer.addPass( bokehPass )





/**
 * Animate function
 */

function animate() {



    //Update controls
    //controls.update();


    //Add delay to look at
    target.x += ( mouse.x - target.x ) * .02
    target.y += ( mouse.y - target.y ) * .02 

    camera.position.x = target.x * 0.15
    camera.position.y = target.y * 0.05

 
    stats.begin();

    // monitored code goes here
	renderer.render( scene, camera )
    composer.render();

    stats.end();

    requestAnimationFrame( animate )
}

animate(renderer, scene, camera)

