import { Universe } from "./game-kittools/universe.js";
import { Player, Platform, Figure} from "./game-kittools/entityFactory.js";
import { Control } from "./game-kittools/controls.js";


// Canvas config
const canvas = document.getElementById("canvas");
const world = new Universe(canvas);

/* world.activeCanvasResponsive(40, true) */

//PLAYER

function createPlayer(){
    const slime = new Player({width: 400, height: 400, universe : world})
    slime.position.y = 200;
    slime.position.x = 340;
    return slime
}

function renderPlayer(){
    //CONTROLES_PLAYER
    const slime = createPlayer()
    const controlsOfPlayer = new Control(slime);
    slime.configHitbox({positionX:150, positionY: 300, width:110, height:100, border:0, color:"white", type:"player"});
    controlsOfPlayer.hookEntity("idle", false);
}

const rect = new Figure({width: 400, height: 100, universe: world});
rect.position.y = 610;
rect.position.x = 378;
rect.configHitbox({positionX:0, positionY:0, width:400, height: 100, border:3, color:"red", type:"figure"})
rect.isVisibleHitbox = false;
world.stackAnimations.push(rect)

renderPlayer()

export default world