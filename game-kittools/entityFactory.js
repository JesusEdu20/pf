
import { slime, platformJungle} from "./spritesheets.js";
import { controls } from "./defaultControls.js";
import { generateFramesMap } from "./generateframesMap.js";

class EntityFactory{
    constructor(){

    }
    createEntity(){
        throw new Error('createEntity method should be implemented');
    }
}

export class slimeFactory extends EntityFactory{
    constructor({color, width, height, world}){
        color, 
        width, 
        height, 
        world
    }

    createEntity(){
        const slimeCollection = {blue: blueSlime, red: redSlime, green: greenSlime};
        const spriteSheet = slimeCollection[color]; 
        return new Player({width: 250, height: 250, spriteSheet, universe:world})
    }
}

class Entity{
    constructor(){
        this.speedX = 0;
        this.speedY = 0;
        this.acceleration = 0;
        this.gameFrameCounter = 0;
        this.spriteSheet = null;
        this.image = null;
        this.staggerFrames = 5;
        this.animationName = null;
        this.isLoopAnimation = false;
        this.frameCoordinates = null;
        this.frame = 0;
        this.hitbox = null;
        this.isVisibleHitbox = false;
        this.width = 0;
        this.height = 0;
        this.position = { x: 0, y: 0 };
        this.type = "entity";
        this.collisionActionStack = [];
        this.behaviorStack = [];
        this.controls = null;
        this.movementAlgorithm = null;
        this.universe = null;
    }

    configHitbox() {
        throw new Error('createTire method should be implemented');
    }

    readHitbox() {
        throw new Error('createTire method should be implemented');
    }

    setUpKeyControl() {
        throw new Error('createTire method should be implemented');
    }

}


export class Player extends Entity{
    constructor({
        width,
        height,
        spriteSheet,
        frameCoordinates,
        universe
    }){
        super();
        this.width = width;
        this.height = height;
        this.spriteSheet = spriteSheet || slime().img;
        this.frameCoordinates = frameCoordinates || slime().framesCoordinates;
        this.controls = controls;
        this.universe = universe;
        this.type = "player"; //verificar para quitar

    }

    configHitbox({ width, height, border, color, positionX, positionY }) {

        this.hitbox = {
            x: 0,
            y: 0,
            positionX,
            positionY,
            width,
            height,
            border: border ?? 1,
            color: color ?? 'black',
            isCollisionBetweenEntitiesFromMapActive: true,
        };
    }

    readHitbox(spritePositionX, spritePositionY) {
        this.hitbox.x = spritePositionX + this.hitbox.positionX;
        this.hitbox.y = spritePositionY + this.hitbox.positionY;
    } 

}

class enemy extends Entity{
    constructor({
        width,
        height,
        spriteSheet,
        frameCoordinates,
        universe,
        movementAlgorithm,
    }){
        super();
        this.width = width;
        this.height = height;
        this.spriteSheet = spriteSheet || slime().img;
        this.frameCoordinates = frameCoordinates || slime().framesCoordinates;
        this.universe = universe;
        this.movementAlgorithm = movementAlgorithm; //experimental
        this.type = "enemy"; //verificar para quitar
    }

    configHitbox({ width, height, border, color, positionX, positionY }) {

        this.hitBox = {
            x: 0,
            y: 0,
            positionX,
            positionY,
            width,
            height,
            border: border ?? 1,
            color: color ?? "black",
            isCollisionBetweenEntitiesFromMapActive: false,
        };
    }

    readHitbox(spritePositionX, spritePositionY) {
        this.hitBox.x = spritePositionX + this.hitBox.positionX;
        this.hitBox.y = spritePositionY + this.hitBox.positionY;
    }
}


export class Platform extends Entity{
     constructor({
        width,
        height,
        image,
        universe,
    }){
        super();
        this.width = width;
        this.height = height;
        this.image = image || platformJungle().img;
        this.universe = universe;
        this.type = "platform";
    }

    configHitbox({ width, height, border, color, positionX, positionY }) {

        this.hitbox = {
            x: 0,
            y: 0,
            positionX,
            positionY,
            width,
            height,
            border: border ?? 1,
            color: color ?? "black",
            isCollisionBetweenEntitiesFromMapActive: false,
        };
    }

    readHitbox(spritePositionX, spritePositionY) {
        this.hitbox.x = spritePositionX + this.hitbox.positionX;
        this.hitbox.y = spritePositionY + this.hitbox.positionY;
    }

}

//falta agregar opcion parallax
class backgrounds extends Entity{
    constructor({
        width,
        height,
        image,
        universe,
    }){
        super();
        this.width = width;
        this.height = height;
        this.image = image || platformJungle().img;
        this.universe = universe;
        this.type = "background";
    }
}

export class Figure extends Entity{
    constructor({
        width,
        height,
        universe,
    }){
        super();
        this.width = width;
        this.height = height;
        this.universe = universe;
        this.type = "figure";
       
    }

    configHitbox({ width, height, border, color, positionX, positionY }) {

        this.hitbox = {
            x: 0,
            y: 0,
            positionX,
            positionY,
            width,
            height,
            border: border ?? 1,
            color: color ?? "black",
            isCollisionBetweenEntitiesFromMapActive: false,
        };
    }

    readHitbox(spritePositionX, spritePositionY) {
        this.hitbox.x = spritePositionX + this.hitbox.positionX;
        this.hitbox.y = spritePositionY + this.hitbox.positionY;
    }
} 

