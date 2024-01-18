
export class Control{
    
    constructor(Entity){
        this.Entity = Entity;
    }

    hookEntity(defaultAnimationName, isVisibleHitbox = false){

        this.Entity.animationName = defaultAnimationName;
        this.Entity.isVisibleHitbox = isVisibleHitbox;
        this.Entity.universe.requestSpriteAnimation(this.Entity);

        //Entity 
        let isDisplayed = false;
        this.Entity.spriteSheet.getAttribute("isDisplayed") === "false";

        for(const control in this.Entity.controls){

            const config = this.Entity.controls[control];
            const startAnimation = config.startAnimation;
            const startEvent = config.startEvent;
            const isLoopStartAnimation = config.startLoop;
            const endAnimation = config.endAnimation;
            const endEvent=config.endEvent;
            const isLoopEndAnimation = config.endLoop;
            const displacementPhysics = config.displacementPhysics;
            const obj = config.addListenerToObject || window

            obj.addEventListener(startEvent, (e)=>{

                isDisplayed = this.Entity.spriteSheet.getAttribute("isDisplayed")==="true"? true : false;
                
                if(!isDisplayed){
                    
                    if(e.key===control || control.substring(0, 3) === "btn"){
                        /*Change animation when object(Entity) startEvent*/
                        this.Entity.frame = 0;
                        this.Entity.animationName = startAnimation;
                        this.Entity.isLoopAnimation = isLoopStartAnimation;
                        
                        this.Entity.spriteSheet.setAttribute("isDisplayed", "true")

                        this.Entity.speedX = displacementPhysics.speedX;
                        this.Entity.speedY = displacementPhysics.speedY;
                        this.Entity.acceleration = this.Entity.universe.physics.gravity;
                    }
                }
            })

            obj.addEventListener(endEvent, (e)=>{
                
                isDisplayed = this.Entity.spriteSheet.getAttribute("isDisplayed") === "true"? true : false;

                if(isDisplayed){
                    if(e.key === control || control.substring(0, 3) === "btn"){
                       /*Change animation when object(Entity) endEvent*/
                       this.Entity.frame = 0;
                       this.Entity.animationName = endAnimation;
                       this.Entity.isLoopAnimation = isLoopEndAnimation;

                       this.Entity.spriteSheet.setAttribute("isDisplayed", "false")

                       this.Entity.speedX = 0;
                       this.Entity.speedY = 0;
                        
                    }

                }    
            })
        }
    }
} 


















