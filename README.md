# WebXR-Vite-Babylon-Simple

Examples for visualising DepthKit volumetric captures using Babylon.js in WebGL.

* [babylonjs 5](https://www.babylonjs.com/) (ES6)
* [vite](https://vitejs.dev/)
* [typescript](https://www.typescriptlang.org/)

Ideas and assets used from [ScatterCo/Depthkit.js](https://github.com/ScatterCo/Depthkit.js)
and [juniorxsound/Depthkit.js])(https://github.com/juniorxsound/Depthkit.js).

## Notes

The lib folder has been structured with possibility of moving to its own project for publishing as npm library. Perhaps
named "depthkit-babylonjs".

## Usage

Developed and tested with node 16.x, but 14.x probably works too.

- `npm install`
- `npm run dev`

Or, to allow access over network:

- `npm run dev -- --host=0.0.0.0`

Browse:

- `https://<your-server-ip>:3443`

