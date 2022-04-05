import { TransformNode } from '@babylonjs/core/Meshes/transformNode'
import { Scene } from '@babylonjs/core/scene.js'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { DepthKitProps } from './DepthKitProps'

export class DepthKitMesh extends TransformNode {

  private readonly vertexMesh: Mesh

  constructor(private props: DepthKitProps,
              private meshScalar: number,
              private scene: Scene,
              id: string = 'DepthKitMesh') {
    super(id, scene)
    this.vertexMesh = this._createMesh()
    this.vertexMesh.parent = this
  }

  setMeshScalar(meshScalar: number) {
    throw new Error('Method not implemented.')
  }

  getVertexMesh(): Mesh {
    return this.vertexMesh
  }

// dispose() {
  //   super.dispose()
  // }


  //TODO: This has not been fully implemented, uses a hack to get enough vertices for decent display, and is not
  //      efficient.
  private _createMesh(): Mesh {
    const vertsWide = (this.props.textureWidth / this.meshScalar) + 1
    const vertsTall = (this.props.textureHeight / this.meshScalar) + 1

    // const geometry = this._createGeometryBuffer(vertsWide, vertsTall)
    // const mesh = new Mesh(`${this.id}-depthkit-mesh`, this.scene)
    // geometry.applyToMesh(mesh)

    // const mesh = MeshBuilder.CreateTiledPlane(`${this.id}-depthkit-mesh`, {
    //     width: 1,
    //     height: 1,
    //     tileWidth: 10,
    //     tileHeight: 10,
    //     sideOrientation: Mesh.FRONTSIDE // tbd
    //   },
    //   this.scene)

    const mesh = MeshBuilder.CreatePlane(`${this.id}-depthkit-mesh`, {
        width: 1,
        height: 1,
        sideOrientation: Mesh.DOUBLESIDE // tbd
      },
      this.scene)


    //TODO: This is temporary hack to avoid manual vertex and index creation
    mesh.increaseVertices(vertsWide)

    // SAFARI - WIP: This verifies that the video texture loads and plays
    // const tMat = new StandardMaterial('test', this.scene)
    // tMat.diffuseTexture = new VideoTexture('DepthKitVideoTexture', this.video!!, this.scene)
    // tMat.emissiveColor = new Color3(1, 1, 1)
    // mesh.material = tMat

    return mesh
  }


  // TODO:
  // private _createGeometryBuffer(vertsWide: number, vertsTall: number): Geometry {
  //   const positions: number[] = []
  //   const vertexData = new VertexData()
  //   const geometry = new Geometry(`${this.id}-geometry`, this.scene, vertexData, false)
  //
  //   if (!this.props) {
  //     return geometry
  //   }
  //
  //   const vertexStep = new Vector2(this.meshScalar / this.props.textureWidth, this.meshScalar / this.props.textureHeight)
  //
  //   for (let y = 0; y < vertsTall; y++) {
  //     for (let x = 0; x < vertsWide; x++) {
  //       positions?.push(x * vertexStep.x, y * vertexStep.y, 0)
  //     }
  //   }
  //   geometry.setVerticesData(VertexBuffer.PositionKind, positions)
  //
  //   return geometry
  // }

}
