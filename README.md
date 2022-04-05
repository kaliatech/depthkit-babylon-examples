# WebXR-Vite-Babylon-Simple

Examples for visualising [Scatter Depthkit](https://www.scatter.nyc/depthkit) volumetric captures using Babylon.js in WebGL.

* [Depthkit](https://www.scatter.nyc/depthkit)
* [babylonjs 5](https://www.babylonjs.com/) (ES6)
* [vite](https://vitejs.dev/)
* [typescript](https://www.typescriptlang.org/)

Ideas and assets used from [ScatterCo/Depthkit.js](https://github.com/ScatterCo/Depthkit.js)
and [juniorxsound/Depthkit.js](https://github.com/juniorxsound/Depthkit.js).

## Demo

https://kaliatech.github.io/depthkit-babylon-examples/dist

## Status - 20220405 - Work-in-progress

Remaining issues:

 - In Safari (OSX and iOS), upon play the video texture does black.
 - The shader was only half ported from [previous work](https://github.com/ScatterCo/Depthkit.js) and needs to be completed/fixed. There are errors in the current shader code that cause artifacts and wrong perspective correction.
 - The current code does not setup valid and efficient vertex/index buffers. It's currently hard coded for sample data.

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

