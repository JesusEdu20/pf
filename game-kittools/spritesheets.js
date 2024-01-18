import { generateFramesMap } from "./generateframesMap.js";

export function slime(){
   const image = new Image();
   image.src = "../assets/spritesheet-slime.png"
   
   const map = generateFramesMap({width: 1665, height: 1281}, {name:"attack", frames:4}, {name:"attack-2", frames:4}, {name:"attack-3", frames:5}, {name:"dead", frames:3}, {name:"hurt", frames: 6}, {name:"idle", frames: 8}, {name:"jump", frames: 13}, {name:"run", frames: 7}, {name:"run-attack", frames: 10}, {name:"walk", frames: 8}, {sprite: image})

   return {
    img: image,
    framesCoordinates: map,
   }
}


export function platformJungle(){
   const image = new Image();
   image.src = "../assets/platforms/platform.png";
   
   const map = generateFramesMap(null, {name:"platform", frames: 1 }, {sprite: image})

   return {
    img: image,
    framesCoordinates: map,
   }
}

