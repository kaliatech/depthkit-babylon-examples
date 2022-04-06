import { Engine } from '@babylonjs/core/Engines/engine'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
import { AxesViewer } from '@babylonjs/core/Debug/axesViewer'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { Scene } from '@babylonjs/core/scene'
import { Tools } from '@babylonjs/core/Misc'
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color'

export abstract class AbstractExample {

  protected engine: Engine
  protected scene: Scene

  private onResizeHandle = this.onResize.bind(this)

  protected constructor(protected canvas: HTMLCanvasElement, protected window?: Window) {
    this.engine = new Engine(canvas, true, {}, true)

    this.scene = new Scene(this.engine)
    this.scene.clearColor = Color4.FromColor3(Color3.Black())

    this.window?.addEventListener('resize', this.onResizeHandle)

    // void Promise.all([
    //   import('@babylonjs/core/Legacy/legacy'),
    //   import('@babylonjs/core/Debug/debugLayer'),
    //   import('@babylonjs/inspector'),
    // ]).then(() =>
    //   this.scene.debugLayer.show({
    //     handleResize: true,
    //     embedMode: true,
    //     overlay: true,
    //   }),
    // )
  }

  init() {
    // // Add a camera
    const camera = new ArcRotateCamera(
      'Camera',
      Tools.ToRadians(-75),
      Tools.ToRadians(85),
      3,
      new Vector3(0, 1, 0),
      this.scene
    )
    camera.wheelPrecision = 25.0
    // const camera = new FlyCamera('Camera', new Vector3(0, 0, -2), this.scene)
    camera.attachControl(true)

    // Add light
    const light = new HemisphericLight('light1', new Vector3(0, 6, 0), this.scene)
    light.intensity = 0.7

    // Add axes viewer with 1 unit lengths
    new AxesViewer(this.scene, 1)

    this.engine.runRenderLoop(() => {
      this.scene?.render()
    })

  }

  dispose() {
    this.window?.removeEventListener('resize', this.onResizeHandle)
  }

  protected onResize() {
    console.log('onResize')
    this.engine.resize(true)
  }
}
