export const controls = {
    w: {
        startAnimation:"jump",
        startEvent: "keydown",
        startLoop: true,
        endAnimation: "idle",
        endEvent: "keyup",
        endLoop: true,
        displacementPhysics:{speedX:0, speedY:0}
    },
    d: {
        startAnimation:"walk",
        startEvent: "keydown",
        startLoop: true,
        endAnimation: "idle",
        endEvent: "keyup",
        endLoop: true,
        displacementPhysics:{speedX:0, speedY:0}
    },
    a: {
        startAnimation: "attack",
        startEvent: "keydown",
        startLoop: true,
        endAnimation:"idle",
        endEvent: "keyup",
        endLoop: true,
        displacementPhysics:{speedX:0, speedY:0}
    }
}
