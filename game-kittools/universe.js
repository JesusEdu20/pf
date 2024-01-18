/* import { Character } from "./character.js" */

import { Player } from "./entityFactory.js";

    export class Universe{

        constructor(canvas){

            if(!Universe.instance){
                Universe.instance = this;
                this.stackAnimations=[];
                this.canvas=canvas;
                this.menu = null;
                this.ctx=this.canvas.getContext("2d");
                this.physics = {gravity:1.0000002};
                this.maps = {};
                this.synchronizedActionExecutionStack=[];
                this.stackCopiedModelObjects={};
            }

            return Universe.instance
        }

        nextFrame(request){

            const {isLoopAnimation, staggerFrames, gameFrameCounter, spriteSheet, frameCoordinates, animationName} = request;
            const numberOfFrames = spriteSheet ? frameCoordinates[animationName].length: 1;

            if( isLoopAnimation || request.frame != numberOfFrames-1){//seleccionar frame
                //dibujar siguiente frame
                const nextframe = Math.floor(gameFrameCounter / staggerFrames) % numberOfFrames;
                request.frame = nextframe;
            }
        }

        draw = (typeOfDrawing, game, request)=>{ 
           
            switch (typeOfDrawing){
                case 'player':{
                    const {
                        width,
                        height,
                        animationName, 
                        spriteSheet, 
                        image, 
                        frameCoordinates, 
                        position, 
                        frame,
                        } = request

                        const actionName = animationName || "none";
                        const img = spriteSheet ? spriteSheet : image; 
                        const coordinates = frameCoordinates || { none:[{codX:1, codY: 1}]} ;
                        const frameWidth = spriteSheet ? frameCoordinates.frameDimensions.width : image.width; 
                        const frameHeight = spriteSheet ? frameCoordinates.frameDimensions.height : image.height;
                        
                    game.drawImage(img, coordinates[actionName][frame].codX, coordinates[actionName][frame].codY, frameWidth, frameHeight, position.x, position.y, width, height);
                    break;
                }

                case 'platform':{
                    const {
                        width,
                        height,
                        animationName, 
                        spriteSheet, 
                        image, 
                        frameCoordinates, 
                        position, 
                        frame,
                        } = request
                        const actionName = animationName || "none";
                        const img = spriteSheet ? spriteSheet : image; 
                        const coordinates = frameCoordinates || { none:[{codX:1, codY: 1}]} ;
                        const frameWidth = spriteSheet ? frameCoordinates.frameDimensions.width : image.width; 
                        const frameHeight = spriteSheet ? frameCoordinates.frameDimensions.height : image.height;
                       

                    game.drawImage(img, coordinates[actionName][frame].codX, coordinates[actionName][frame].codY, frameWidth, frameHeight, position.x, position.y, width, height);
                    break;
                }

                case 'figure': {
                    const { position, width, height } = request;
                    game.fillStyle = 'transparent'
                    game.fillRect(position.x, position.y, width, height);
                    break;
                }
            }
        }

        runGameLoop = () => {

            //limpieza del canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            this.stackAnimations.forEach(request => {
                //LOGICA
                    const {hitbox, isVisibleHitbox, position} = request;

                    this.executeBehaviorStack(request);
                    this.activePhysics(request);
                    if(request.type !== 'figure'){
                        this.nextFrame(request);//iterador de frames
                    }

                     //activeHitbox & debugHitbox
                    if(hitbox){
                        request.readHitbox(position.x, position.y);
                        if(isVisibleHitbox){
                            this.ctx.strokeStyle = hitbox.color;
                            this.ctx.lineWidth = hitbox.border;
                            this.ctx.strokeRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
                        }
                    }
                    
                    this.draw(request.type, this.ctx, request);
              
                
                request.gameFrameCounter++;
            }); 

            this.detectCollisions();
            requestAnimationFrame(this.runGameLoop);
        }


        requestSpriteAnimation(request){

            //asignar id
            this.stackAnimations.push(request)
            request.entityId = this.stackAnimations.indexOf(request) + Math.random().toString(36).substring(2,9) + Date.now()
            
        }

        removeSpriteAnimation(id){

            const index=this.stackAnimations.findIndex((request)=> id===request.spriteId)
            this.stackAnimations.splice(index,1)
            
        }

        detectCollisions(){
            for(let i=0; i < this.stackAnimations.length-1; i++ ){
                
                const sprite = this.stackAnimations[i];
                const hitbox = sprite.hitbox;
                if(hitbox === null) continue;                
                
                for(let j=i+1; j<this.stackAnimations.length; j++){
                    
                    const nextSprite=this.stackAnimations[j];
                    const nexthitbox=nextSprite.hitbox;
                    
                    if(nextSprite.hitbox === null) continue;
                    if(!nexthitbox.isCollisionBetweenEntitiesFromMapActive) continue;

                    if( hitbox.x > nexthitbox.x + nexthitbox.width|| //derecha
                    hitbox.x + hitbox.width < nexthitbox.x || //izquierda
                    hitbox.y > nexthitbox.y + nexthitbox.height || //abajo
                    hitbox.y + hitbox.height < nexthitbox.y ){ //arriba
                        
                        //no collision 
                           
                            if(sprite.type !== "player" || nextSprite.type !== "player"){
                                const player = sprite.type == "player" ? sprite : nextSprite;
                                const obstacle = sprite.type !== "player" ? sprite : nextSprite;
                                
                                if(player.hitbox.y + player.hitbox.height <= obstacle.hitbox.y
                                    && player.hitbox.y + player.hitbox.height + player.speedY >= obstacle.hitbox.y
                                    
                                    && player.hitbox.x + player.hitbox.width > obstacle.hitbox.x
                                    && player.hitbox.x < obstacle.hitbox.x + obstacle.hitbox.width){
                                        player.speedY = 0;  
                                       
                                           
                                }          
                            }

                        } else {

                        //collision detected
                        console.log("colision")
                        if(sprite.type !== "player" || nextSprite.type !== "player"){

                            const player= sprite.type == "player" ? sprite : nextSprite;
                            const obstacle = sprite.type !== "player"? sprite : nextSprite;

                            if(player.hitbox.y + player.hitbox.height >= obstacle.hitbox.y
                                && player.hitbox.y + player.hitbox.height + player.speedY >= obstacle.hitbox.y
                                
                                && player.hitbox.x + player.hitbox.width > obstacle.hitbox.x
                                && player.hitbox.x < obstacle.hitbox.x + obstacle.hitbox.width){
                                 
                                player.speedX=0;
                                player.position.x = (obstacle.hitbox.x + (player.position.x - player.hitbox.x )) - player.hitbox.width;
                               
                             }

                        }

                            sprite.collisionActionStack.forEach(action=>{
                                action(nextSprite)
                            })

                            nextSprite.collisionActionStack.forEach(action=>{
                                action(sprite)
                            })

                            console.log("colision")
                    
                        }  
                }
            }
        } 

        activePhysics (request){

            const acceleration = request.acceleration;
            const around = request.around;
            const position = request.position;
            let speedY = request.speedY;
            let speedX = request.speedX;

            request.speedY+=acceleration
            
            position.y+=speedY;
            position.x+=speedX;
            
        }

        setCanvasSize = (element, decimalPercentage, isSquare, menu) => {
            
             // Ajusta el ancho y el alto del elemento en función del porcentaje asignado
            function set(width, height, elem, decimalPercentage){
                element.style.width = `${ width * (decimalPercentage / 100)}px`;
                element.style.height = `${ height * (decimalPercentage / 100)}px`;
            }    
               
            let minSize = window.innerWidth > window.innerHeight? window.innerHeight : window.innerWidth; // Comprueba si el ancho de la ventana es mayor que su altura
            const dimensions = !isSquare? {width: window.innerWidth, height: window.innerHeight}:{width: minSize, height: minSize}
            
            const {width, height} = dimensions
            set(width, height, element, decimalPercentage);

          /*   if(menu!==null){
                menu.style.width = `${elementSize * (decimalPercentage / 100)}px`;
                menu.style.height = `${elementSize * (decimalPercentage / 100)}px`;

            } */
          

        }

        activeCanvasResponsive(decimalPercentage, isSquare){

             //* / Agrega un evento de escucha al objeto window para detectar cambios en el tamaño de la ventana
             window.addEventListener("resize", () => {
                // Cuando ocurre el evento "resize", llama a la función setElementSize para ajustar el tamaño del canvas al 70% de la ventana
                this.setCanvasSize(this.canvas, decimalPercentage, isSquare, this.menu);
            });
            
            window.addEventListener("load", () => {
                // Cuando ocurre el evento "resize", llama a la función setElementSize para ajustar el tamaño del canvas al 70% de la ventana
                this.setCanvasSize(this.canvas, decimalPercentage, isSquare, this.menu);
            });
        }

        playMap(mapName){

            const map=this.maps[mapName]
           
            map.forEach(elements=>{

                this.requestSpriteAnimation(elements)
            })
           
        }

        executeBehaviorStack(request){
            
            request.behaviorStack.forEach(action=>{
                action(request)
            })
        }

        

        /* funcionalidad experimental */

        createReel(objectModel){

            const reel={

                createFrame: (widthRange, heightRange) => {

                    const frame = new Entity({

                        speedX:objectModel.speedX,
                        speedY:objectModel.speedY,
                        spriteSheet: objectModel.spriteSheet,
                        frameWidth: objectModel.frameWidth,
                        frameHeight: objectModel.frameHeight,

                        staggerFrames: objectModel.staggerFrames, 
                        animationName: objectModel.animationName,
                        frameCoordinates: objectModel.frameCoordinates,

                        universe: objectModel.universe,
                        width: objectModel.width,
                        height: objectModel.height,
                        positionX: objectModel.positionX,
                        positionY: objectModel.positionY,
                        type: objectModel.type}
                    )

                    frame.hitBox = objectModel.hitBox
                    frame.nickName = objectModel.nickName 

                    if(this.stackCopiedModelObjects[objectModel.nickName]){
                        //asignar
                        this.stackCopiedModelObjects[objectModel.nickName].frames.push(frame)
                    }

                    else{
                        
                        this.stackCopiedModelObjects[objectModel.nickName]={objectModel, frames:[frame]}; //reasignacion no necesaria
                    }

                    const longitud = this.stackCopiedModelObjects[objectModel.nickName].frames.length 
                    const object = this.stackCopiedModelObjects[objectModel.nickName].frames[longitud-1];

                    //crea o conf el area
                    const cols =  Math.floor(((widthRange / 100) * this.canvas.width ) / object.width) ;
                    const rows = Math.floor(((heightRange / 100) * this.canvas.height) / object.height) ; 

                    //Posicionan el frame en los puntos (0, 0) del canvas
                    object.position.x=0;
                    object.position.y=0;
                    
                    //adaptan el frame al tamano del array2d
                    object.width = cols * object.width;
                    object.height = rows * object.height; 

                    //convertir a sombra
                    const spriteSheet= object.spriteSheet;

                    this.requestSpriteAnimation(frame)
                    
                    frame.cols=cols;
                    frame.rows=rows;

                    return frame
                },

                select:(action, index)=>{

                    const model=this.stackCopiedModelObjects[objectModel.nickName]
                    
                    model.frames[index].grid.forEach(row=>{
                        row.forEach(elem=>{
                            action(elem)
                            
                        })
                    })

                },

                renderFrame:(frame)=>{

                    const {rows, cols, spriteSheet} = frame
                   
                   
                    const grid=this.createGrid(frame, rows, cols, spriteSheet);
                    frame.grid=grid;
                    this.renderGrid(grid)
                    this.invertRandomOrder(grid)
                    this.orderGridRandom(rows, cols, grid, [2, 1])

                    
                    frame.isShadow=true;
                    frame.spriteSheet=undefined 
                    frame.hitBox=undefined;
                    
                }
            }

            this.removeSpriteAnimation(objectModel.spriteId) 
            return reel
            
        }

        
        createGrid(object, rows, cols, spriteSheet){
            
            const grid=[]

            try{

                if(object.hitBox===undefined){
                    throw new Error(`This object does not have a defined hitbox`)
                }
                
                for(let i = 0; i < rows ; i++ ){

                    const arr = []
                    
                    for (let j = 0; j < cols; j++){

                        const copyObject = new Entity( {
                            
                            speedX:object.speedX,
                            speedY:object.speedY,
                            spriteSheet: spriteSheet,
                            frameWidth: object.frameWidth,
                            frameHeight: object.frameHeight,

                            staggerFrames: object.staggerFrames, 
                            animationName: object.animationName,
                            frameCoordinates: object.frameCoordinates,

                            universe:object.universe,
                            width: 100,
                            height: 100,
                            positionX: (j * 100) + object.position.x,
                            positionY: (i * 100) + object.position.y,
                            type: object.type

                            }
                        )

                        copyObject.isLoopAnimation = true;
                        copyObject.configHitbox({positionX:object.hitBox.positionX, positionY:object.hitBox.positionY, width:object.hitBox.width, height:object.hitBox.height, border: object.hitBox.border, color: object.hitBox.color, type: object.hitBox.type})
                        copyObject.hitBoxCopy=copyObject.hitBox;
                        copyObject.nickName =`${object.nickName}-${"copy"}`
                       
                        copyObject.isVisibleHitbox=false

                    
                    arr.push(copyObject)
                    }
                    
                    grid.push(arr)
                }  

            }

            catch(error){
                console.error(error)
            }

            return grid
            
        }

        orderGridRandom(rows, cols, area, spacing){

            const sequence = this.getRandomSequence(rows, cols, spacing)

                for (let i = 1; i <= rows; i++) {
                    for (let j = 1; j <= cols; j++) {
                        if (i % sequence.rows === 0 && j % sequence.cols === 0) {
                            //convertir en sombra todos los elementos que hayan obtenido un residuo 0
                            area[i - 1][j - 1].hitBox = area[i - 1][j - 1].hitBoxCopy;
                            area[i - 1][j - 1].isShadow = false;
                        }
                    }
                }
            
            
        } 

        invertRandomOrder(grid){
            
                for (let i = 0; i < grid.length; i++) {
                  const row = grid[i];
                  for (let j = 0; j < row.length; j++) {
                    const object = row[j];
                    if (object.isShadow === false) {
                      object.hitBox = undefined;    
                      object.isShadow = true;
                    }
                  }
                }
        }
      
        renderGrid(grid){

            for(let i = 0; i < grid.length; i++){
                
                const  row = grid[i];
                
                for(let j = 0; j < row.length; j++){

                    const object = row[j] 
                    this.requestSpriteAnimation(object)
                    
                }
            }
        }
        
        getRandomSequence(rows, cols, minSpacing){
            
            const [minRow, minCol] = minSpacing;

           try{

            if(minRow > rows || minCol > cols ){
                throw new Error(`Spacing cannot exceed the available positions: Rows: ${minRow}/${rows}, Cols: ${minCol}/${cols}. `)
            }

            const ranges = minSpacing ? {rows: minRow + 1, cols: minCol + 1} : {rows: 1, cols: 1 };
            const sequence = {
                    rows: Math.floor(Math.random() * (rows - ranges.rows + 1)) + ranges.rows,
                    cols: Math.floor(Math.random() * (cols - ranges.cols + 1)) + ranges.cols
                    };

            return sequence;

            }
            catch(error){

                console.error("Error:", error.message)
            }
                
        }

    }


 






    
    
    
    
    
 
     