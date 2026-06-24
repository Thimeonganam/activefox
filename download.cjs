const https = require('https');
const fs = require('fs');
const url = "https://drive.google.com/uc?export=download&id=1FWBO9_EiquMNoZz3ThgJmbbntBHw86gd";
https.get(url, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    https.get(res.headers.location, (res2) => {
      res2.pipe(fs.createWriteStream('public/ice_cube.glb')).on('finish', () => console.log('Downloaded'));
    });
  } else {
    res.pipe(fs.createWriteStream('public/ice_cube.glb')).on('finish', () => console.log('Downloaded'));
  }
});
