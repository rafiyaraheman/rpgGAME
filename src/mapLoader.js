const tmx = require("tmx-parser");

async function loadMap() {
  const map = await new Promise((resolve, reject) => {
    tmx.parseFile("./src/map2.tmx", function (err, loadedMap) {
      if (err) return reject(err);
      resolve(loadedMap);
    });
  });

  const layer = map.layers[0];
  const groundTiles = layer.tiles;
  const decalTiles = map.layers[1]?.tiles || [];
  const ground2D = [];
  const decal2D = [];

  for (let row = 0; row < map.height; row++) {
    const groundRow = [];
    const decalRow = [];
    for (let col = 0; col < map.width; col++) {
      const groundTile = groundTiles[row * map.width + col];
      groundRow.push(groundTile ? { id: groundTile.id, gid: groundTile.gid } : undefined);

      const decalTile = decalTiles[row * map.width + col];
      decalRow.push(decalTile ? { id: decalTile.id, gid: decalTile.gid } : undefined);
    }
    ground2D.push(groundRow);
    decal2D.push(decalRow);
  }

  return {
    ground2D,
    decal2D,
  };
}

module.exports = loadMap;



// const tmx = require("tmx-parser");

// async function loadMap() {
//   const map = await new Promise((resolve, reject) => {
//     tmx.parseFile("./src/map.tmx", function (err, loadedMap) {
//       if (err) return reject(err);
//       resolve(loadedMap);
//     });
//   });

//   const layer = map.layers[0];
//   const groundTiles = layer.tiles;
//   const decalTiles = map.layers[1]?.tiles || []; // Handle missing second layer
//   const ground2D = [];
//   const decal2D = [];
  
//   for (let row = 0; row < map.height; row++) {
//     const groundRow = [];
//     const decalRow = [];
//     for (let col = 0; col < map.width; col++) {
//       const groundTile = groundTiles[row * map.width + col];
//       if (groundTile) {
//         groundRow.push({ id: groundTile.id, gid: groundTile.gid });
//       } else {
//         groundRow.push(undefined); // Handle missing tile gracefully
//       }

//       const decalTile = decalTiles[row * map.width + col];
//       if (decalTile) {
//         decalRow.push({
//           id: decalTile.id,
//           gid: decalTile.gid,
//         });
//       } else {
//         decalRow.push(undefined);
//       }
//     }
//     ground2D.push(groundRow);
//     decal2D.push(decalRow);
//   }

//   return {
//     ground2D,
//     decal2D,
//   };
// }

// module.exports = loadMap;
