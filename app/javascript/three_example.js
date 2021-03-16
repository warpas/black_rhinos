import * as THREE from 'three'
import * as dat from 'dat.gui'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


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
            color: 0x3e3e3e
        })

        const parameters = {
            color: 0x3e3e3e
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
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(15, sizes.width / sizes.height, 0.1, 100)
camera.position.y = .05
camera.position.z = 2
scene.add(camera)

/**
 * Lights
 */

//Point light
const light = new THREE.PointLight( 0xFFffff, 2 )
light.position.x = 2
light.position.z = 1

scene.add( light )

//Ambient light
const ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add(ambientLight)


//Enable mouse control
//const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
canvas.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //console.log (pointOfIntersection)
  
    
}


const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

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
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Animate function
 */

function animate() {

	requestAnimationFrame( animate )

    //Update controls
    //controls.update();

    //Add delay to look at
    target.x += ( mouse.x - target.x ) * .02
    //target.y += ( mouse.y - target.y ) * .02

    camera.position.x = target.x * 0.15
    //camera.position.y = target.y * 0.01

	renderer.render( scene, camera )

}

animate(renderer, scene, camera)