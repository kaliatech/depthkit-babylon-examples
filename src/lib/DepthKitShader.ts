import { ShaderMaterial } from '@babylonjs/core/Materials/shaderMaterial'
import { Scene } from '@babylonjs/core/scene'

// @ts-ignore
import vertexShader from './shaders/depthkit.vert.glsl'

// @ts-ignore
import fragmentShader from './shaders/depthkit.frag.glsl'

import { Effect } from '@babylonjs/core/Materials/effect'
import { DepthKitProps } from './DepthKitProps'
import { Matrix, Vector2, Vector4 } from '@babylonjs/core/Maths/math.vector'
import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture'

Effect.ShadersStore['depthkitVertexShader'] = vertexShader
Effect.ShadersStore['depthkitFragmentShader'] = fragmentShader

export class DepthKitShader extends ShaderMaterial {
  private readonly videoTexture: VideoTexture

  constructor(private props: DepthKitProps,
              private video: HTMLVideoElement,
              private meshScalar: number,
              scene: Scene,
              id: string = 'DepthKitMaterial',
  ) {
    super(id, scene, 'depthkit', {
      attributes: ['position', 'normal', 'uv'],
      samplers: ['map'],
      uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection', 'time', 'direction',
        'time', 'nearClip', 'farClip', 'meshScalar', 'focalLength', 'principalPoint', 'imageDimensions', 'extrinsics', 'extrinsics', 'extrinsicsInv', 'crop', 'width', 'height', 'opacity'],
    })

    this.videoTexture = this._createVideoTexture(scene)
    this._bindShaderInputs(scene, props, this.videoTexture, meshScalar)
    this.backFaceCulling = false
  }

  setMeshScalar(meshScalar: number) {
    this.setFloat('meshScalar', this.meshScalar)
  }

  dispose() {
    super.dispose()
    this.videoTexture.dispose()
  }

  private _createVideoTexture(scene: Scene): VideoTexture {
    return new VideoTexture('DepthKitVideoTexture', this.video, scene)

    // SAFARI - WIP:
    // const videoTexture = new VideoTexture('DepthKitVideoTexture', this.video, this.scene, false, false, VideoTexture.TRILINEAR_SAMPLINGMODE, {
    //     autoUpdateTexture: false,
    //     autoPlay: false,
    //     loop: true,
    //   },
    //   (reason) => {
    //     console.error('VideoTexture.onError', reason)
    //   }
    // )

    // Most of this seems to be overridden by Babylon's Video/Dynamic texture handling.
    // videoTexture.uOffset = 0.5
    // videoTexture.vOffset = 0.5
    // videoTexture.uScale = 0.5
    // videoTexture.vScale = 0.5
    // videoTexture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE
    // videoTexture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE
    // return videoTexture
  }

  private _bindShaderInputs(scene: Scene, props: DepthKitProps, videoTexture: VideoTexture, meshScalar: number) {
    const extrinsics = this._setupExtrinsics(props)

    this.setTexture('map', videoTexture)
    this.setFloat('time', 0.0)
    this.setFloat('nearClip', this.props.nearClip)
    this.setFloat('farClip', this.props.farClip)
    this.setFloat('meshScalar', meshScalar) // todo: refactor with the setMeshScalar method
    this.setVector2('focalLength', new Vector2(this.props.depthFocalLength.x, this.props.depthFocalLength.y))
    this.setVector2('principalPoint', new Vector2(this.props.depthPrincipalPoint.x, this.props.depthPrincipalPoint.y))
    this.setVector2('imageDimensions', new Vector2(this.props.depthImageSize.x, this.props.depthImageSize.y))
    this.setMatrix('extrinsics', extrinsics)
    this.setMatrix('extrinsicsInv', extrinsics.clone().invert())
    this.setVector4('crop', new Vector4(this.props.crop.x, this.props.crop.y, this.props.crop.z, this.props.crop.w))
    this.setFloat('width', this.props.textureWidth)
    this.setFloat('height', this.props.textureHeight)
    this.setFloat('opacity', 1.0)

  }

  private _setupExtrinsics(props: DepthKitProps): Matrix {
    const ex = props.extrinsics!!
    const extrinsics = Matrix.FromArray([
        ex['e00'], ex['e10'], ex['e20'], ex['e30'],
        ex['e01'], ex['e11'], ex['e21'], ex['e31'],
        ex['e02'], ex['e12'], ex['e22'], ex['e32'],
        ex['e03'], ex['e13'], ex['e23'], ex['e33']
      ]
    )
    return extrinsics
  }
}

