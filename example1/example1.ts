import { DepthKit } from '../src/lib/DepthKit'

import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js'

import { AbstractExample } from '../src/js/AbstractExample'
import { Color3 } from '@babylonjs/core/Maths/math.color'

export class Example1 extends AbstractExample {

  private depthKit?: DepthKit

  constructor(canvas: HTMLCanvasElement, window?: Window) {
    super(canvas, window)
  }

  init() {
    super.init()

    const sphereD = 1.0
    const sphereR = sphereD / 2.0

    const sphere = MeshBuilder.CreateSphere('xSphere', { segments: 16, diameter: sphereD }, this.scene)
    sphere.position.x = sphereD + sphereR
    sphere.position.y = sphereR
    sphere.position.z = 0
    const rMat = new StandardMaterial('matR', this.scene)
    rMat.diffuseColor = new Color3(1.0, 0, 0)
    sphere.material = rMat

    const propsUrl = '/assets/john/John.txt'
    const mediaUrl = '/assets/john/John.mp4'

    this.depthKit = new DepthKit('example1')

    this.depthKit
      .load(propsUrl, mediaUrl)
      .catch((err) => {
        //alert("Unable to initialize depth kit.")
        console.error('Unable to initialize depth kit.', err)
      })
  }


  dispose() {
    this.depthKit?.dispose()
    super.dispose()
  }
}



