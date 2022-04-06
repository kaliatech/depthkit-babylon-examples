import { Example1 } from '../example1/example1'
import { WebXRDefaultExperience } from '@babylonjs/core/XR/webXRDefaultExperience'

// Side effects required by environment helper
import '@babylonjs/core/Materials/Textures/Loaders'

// Required for loading controller models from WebXR registry
import '@babylonjs/loaders/glTF'

// Without this next import, error message when loading controller models:
//  "Build of NodeMaterial failed" error when loading controller model"
//  "Uncaught (in promise) Build of NodeMaterial failed: input rgba from block FragmentOutput[FragmentOutputBlock] is not connected and is not optional."
import '@babylonjs/core/Materials/Node/Blocks'

// Needed in recent 5-rc releases, else:
//  "TypeError: sceneToRenderTo.beginAnimation is not a function
//     at WebXRMotionControllerTeleportation2._createDefaultTargetMesh (WebXRControllerTeleportation.ts:751:29)"
import '@babylonjs/core/Animations/animatable'

export class Example2 extends Example1 {

  constructor(canvas: HTMLCanvasElement, window?: Window) {
    super(canvas, window)
  }

  init() {
    super.init()

    WebXRDefaultExperience.CreateAsync(this.scene, {
      optionalFeatures: true,
      floorMeshes: [this.envHelper!!.ground!!],
    })
  }
}




