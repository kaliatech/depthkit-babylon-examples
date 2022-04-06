import { TransformNode } from '@babylonjs/core/Meshes/transformNode'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import type { DepthKitProps } from './DepthKitProps'
import { loadProps } from './DepthKitProps'
import { Matrix, Vector2, Vector3, Vector4 } from '@babylonjs/core/Maths/math.vector'
import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture'
import { DepthKitShader } from './DepthKitShader'
import { Scene } from '@babylonjs/core/scene.js'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js'
import { DepthKitMesh } from './DepthKitMesh'

export class DepthKit {
  private props?: DepthKitProps

  private video?: HTMLVideoElement
  private dkShaderMat?: DepthKitShader
  private dkMeshRoot?: DepthKitMesh

  private meshScalar = 2.0 // default


  constructor(private scene: Scene, private id: string = 'depthkit') {

  }

  /**
   *
   * @param propsOrUrl
   * @param mediaUrl
   */
  async load(propsOrUrl: DepthKitProps | string, mediaUrl: string): Promise<void> {

    // Setup video before the await to load props to avoid certain user security context issues
    this.video = this._createVideo(mediaUrl)

    // Load props
    this.props = await loadProps(propsOrUrl)

    // Setup material/texture/shader
    this.dkShaderMat = new DepthKitShader(this.props, this.video, this.meshScalar, this.scene)

    // Setup mesh/geometry
    this.dkMeshRoot = new DepthKitMesh(this.props, this.meshScalar, this.scene)

    // Apply shader to vertex mesh
    const vertexMesh = this.dkMeshRoot.getVertexMesh()
    vertexMesh.material = this.dkShaderMat

    // TODO: How best to apply default sizing/scaling/positioning?
    vertexMesh.scaling = new Vector3(1, 1, 1)
    vertexMesh.rotate(Vector3.Forward(), Math.PI / 2)
    vertexMesh.position.y = 2
    this.dkMeshRoot.position.z = ((this.props.farClip - this.props.nearClip) / 2.0) - this.props.nearClip
  }

  setMeshScalar(_scalar: 0 | 1 | 2 | 3) {
    // meshScalar values are 1, 2 ,4, 8
    // This ensures that meshScalar is never set to 0
    // and that vertex steps (computed in buildGeometry) are always pixel aligned.
    const newScalar = Math.pow(2, _scalar)
    if (this.meshScalar != newScalar) {
      this.meshScalar = newScalar
      this.dkShaderMat!.setMeshScalar(this.meshScalar)
      this.dkMeshRoot!.setMeshScalar(this.meshScalar)
    }
  }

  dispose() {
    this.dkMeshRoot?.dispose()
    this.dkShaderMat?.dispose()
  }

  play() {
    // SAFARI - WIP: Attempts to get video texture with custom shader working on Safari. Not yet successful.
    // if (this.vidTex?.video) {
    //   this.vidTex?.video.pause()
    //   this.vidTex?.video.load()
    //   this.vidTex?.video.addEventListener('canplaythrough', (event) => {
    //     this.vidTex?.video.play()
    //   });
    // }
    // this.video?.addEventListener('timeupdate', (event) => {
    //  this.vidTex?.updateTexture(true)
    // })
    this.video?.play().catch(err => {
      console.error('Unable to play', err)
      alert('Unable to play: ' + err)
    })
  }

  pause() {
    this.video?.pause()
  }


  private _createVideo(mediaUrl: string) {

    const video = document.createElement('video')

    //TODO: If video previously loaded, will need more work to fully dispose. For now:
    //this.video.src = ''
    video.id = `${this.id}-video`
    video.src = mediaUrl
    video.crossOrigin = 'anonymous'
    video.removeAttribute('controls')
    video.setAttribute('crossorigin', 'anonymous')
    video.setAttribute('playsinline', 'playsinline')

    //TODO: make autoplay optional
    video.muted = true
    video.autoplay = false
    video.loop = true

    // SAFARI - WIP:
    // video.addEventListener('canplaythrough', (event) => {
    //   console.log('canplaythrough')
    // })
    // video.load()
    // video.pause()

    return video;
  }
}

