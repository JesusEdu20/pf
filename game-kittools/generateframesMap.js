export function generateFramesMap(sizeImage, ...configData) {
            
    const spritesheet = configData.find(elem => elem.hasOwnProperty("sprite")).sprite;
    const actions = configData.filter(frames => frames.hasOwnProperty("frames"));   
    const maxFrameValue = Math.max(...actions.map(action => action.frames));
    const maxActionValue = actions.length;

    const spritesheetDimensions = sizeImage? [sizeImage.width, sizeImage.height] : [spritesheet.width, spritesheet.height];
    
    const [spriteWidth, spriteHeight] = spritesheetDimensions;

    const frameDimensions = {width: Math.floor(spriteWidth / maxFrameValue), height: Math.floor(spriteHeight/ maxActionValue)};
    const {width, height} = frameDimensions;
    
    const animationsFrames = {frameDimensions}
   
    actions.forEach((action, index)=>{

        let animationName = action.name
        animationsFrames[animationName] = []

        for(let i=0; i < action.frames; i++){

            let codX= i * width;
            let codY = index * height;  
            animationsFrames[animationName].push({codX, codY});   
        }  
    })
   
    return animationsFrames
}