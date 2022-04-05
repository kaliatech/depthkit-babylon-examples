import { DepthKit } from '../src/lib/DepthKit'

import { AbstractExample } from '../src/js/AbstractExample'
import { Color3 } from '@babylonjs/core/Maths/math.color'
import { EnvironmentHelper } from '@babylonjs/core/Helpers/environmentHelper'

// Side effects required by environment helper
import '@babylonjs/core/Materials/Textures/Loaders'

export class Example1 extends AbstractExample {

  private depthKit?: DepthKit

  protected envHelper?:EnvironmentHelper

  constructor(canvas: HTMLCanvasElement, window?: Window) {
    super(canvas, window)
  }

  init() {
    super.init()

    // const sphereD = 1.0
    // const sphereR = sphereD / 2.0
    // const sphere = MeshBuilder.CreateSphere('xSphere', { segments: 16, diameter: sphereD }, this.scene)
    // sphere.position.x = sphereD + sphereR
    // sphere.position.y = sphereR
    // sphere.position.z = 0
    // const rMat = new StandardMaterial('matR', this.scene)
    // rMat.diffuseColor = new Color3(1.0, 0, 0)
    // sphere.material = rMat

    this.envHelper = new EnvironmentHelper({
      createSkybox: true,
      skyboxColor: Color3.Black()
    }, this.scene)

    //TODO: need a better way
    const propsUrl = '../assets/john/John.txt'
    const mediaUrl = '../assets/john/John.mp4'

    this.depthKit = new DepthKit(this.scene, 'example1')

    this.depthKit
      .load(propsUrl, mediaUrl)
      .catch((err) => {
        //alert("Unable to initialize depth kit.")
        console.error('Unable to initialize depth kit.', err)
      })
  }

  play() {
    this.depthKit?.play()
  }

  pause() {
    this.depthKit?.pause()
  }


  dispose() {
    this.depthKit?.dispose()
    super.dispose()
  }
}




