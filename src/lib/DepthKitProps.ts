export type DepthKitProps = {
  _versionMajor: number,
  _versionMinor: number,

  boundsCenter: {
    'x': number,
    'y': number,
    'z': number,
  },

  boundsSize: {
    'x': number,
    'y': number,
    'z': number,
  },
  format: string,
  numAngles: number,
  crop: {
    'w': number,
    'x': number,
    'y': number,
    'z': number,
  },
  depthFocalLength: {
    'x': number,
    'y': number
  },
  depthImageSize: {
    'x': number,
    'y': number
  },
  depthPrincipalPoint: {
    'x': number,
    'y': number,
  },
  extrinsics: {
    'e00': number,
    'e01': number,
    'e02': number,
    'e03': number,

    'e10': number,
    'e11': number,
    'e12': number,
    'e13': number,

    'e20': number,
    'e21': number,
    'e22': number,
    'e23': number,

    'e30': number,
    'e31': number,
    'e32': number,
    'e33': number
  } | undefined,
  'farClip': number,
  'nearClip': number,
  'textureHeight': number,
  'textureWidth': number
}


export async function loadProps(propsOrUrl: DepthKitProps | string): Promise<DepthKitProps> {
  let props: DepthKitProps
  if (typeof propsOrUrl === 'string') {
    props = await loadPropsFromUrl(propsOrUrl)
  } else {
    props = propsOrUrl
  }
  normalizeProps(props)
  return props
}

async function loadPropsFromUrl(url: string): Promise<DepthKitProps> {
  const resp = await fetch(url)
  if (!resp.ok) {
    throw new Error('Error loading props from URL. Status: ' + resp.status)
  }
  const data = await resp.json()
  return data
}

function normalizeProps(props: DepthKitProps) {
  if (props.textureWidth == undefined || props.textureHeight == undefined) {
    props.textureWidth = props.depthImageSize.x
    props.textureHeight = props.depthImageSize.y * 2
  }
  if (props.extrinsics == undefined) {
    props.extrinsics = {
      e00: 1, e01: 0, e02: 0, e03: 0,
      e10: 0, e11: 1, e12: 0, e13: 0,
      e20: 0, e21: 0, e22: 1, e23: 0,
      e30: 0, e31: 0, e32: 0, e33: 1
    }
  }
  if (props.crop == undefined) {
    props.crop = { x: 0, y: 0, z: 1, w: 1 }
  }
}

