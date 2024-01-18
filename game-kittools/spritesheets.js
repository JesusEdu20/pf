import { generateFramesMap } from "./generateframesMap.js";

export function slime(){
   const image = new Image();
   image.src = "https://lh3.googleusercontent.com/fife/AGXqzDkmuHzQZxCyfayhR3KgTDMCJCYtxocwViNHYO3FQEh7XdEMK3u_mSn8YD0PyP5jCct1rPnXyL1Un7TFEx_7UBjzuBfFZ_BLyKh2_QMovLZ95oLoXckQrzGTzSHLwKHo9PMOl88XZa_x8g1qv1a0UdFItOUPo8FlfREVZo-wBFxxsgpU9wYCCBwchXI3UKWV0vH7Kx1cvQ3htB-GO449r3OBq43jKAas_8z7SjPwX4eDhCO2DUvgFS49ViTFzl6NsyAfXAZvJ_WU7LpLWzjD12yMi6Zg9G-GsSVvt05Rqn8IU6Y5RS7ncpFIF3fgl31T70-_40EYfo87YCRIwTv8tiR2j-dtNTG-Ptna-mTLZ7bkN5oNGR0JdIT8EZRozyayfbEpJWTiO-GEwJQG5rU70nLhBuaW8Kzi9_JZgaci0eHYVoIvPmHyQRO2FnhJYzezSVIxCB2aTR-wQI4bwcbxV6A--EKSHF3XNObiuqOfnqGElF-5lYc5s2igjAKM09cjh3wY33sngLfpjsEs_0GokYrJp2zdkctaS9z0ET4RyEkBe9pAmwf9Q2UzCjIm2jtZVG0tn5LQ6f36c2zfZEP-9jMs3tnFK5HemQO26dN2zGfVeQz6cPgAImTp-b-1Ci0KA0b0O5gEsF0QLGp0TeNw3P_yth0HdrqYmbUqfin46DIXhokJNzjBAKS6fmAWULMQwfEXzRK0_FRas2e3Y1iyG1IduiShMjvxflPTWifHwvVfJqLQMPRSCoFg0ITBMEwLzDPkWJDxw0XAGM_W4CiEtqsSCN0WFufamIQwTFSdS5xPE3sY8n-7N9mppkrUn44b1RIEI8PuKCcWz7HnPKkBOsL_PVkl8-rpcLcweO97dHH5jv8_A0gImc1M7fY50fK232j9TzzGKoofhnmrt3mc_bg1lu-Vzxrp7IfJOX8DkZelG75sXUX-lBVRx9uPxz6ZkuzbQh4KIerpjjcjHg470_26C-4r0MfYFe3leh3io0Uzz7Y8jRtclxuQFM5KGMVI_BHk2xJpAo5E0Gez5Eea3SOOKDkW-9XfLKaOpRiE2628V1AOmh6znOYIraFxwCGWBZZmtWmuyOlX6rkigU-yci6KLccHPOVjiqQu8RokJw5uZS6TS-EEhSiLOP9KlKpXTGewsk4WjMwQeBxYwv2ubUTf-P9I2KQm6y2EYu1t1GM81O9btQpvg_vvB-DJ9Pnhqv1wHqVmpbP0qy7UPmfSlZ_yZ32rw-uDxUPwN_txBYRV6nbsvw1SH7wKF4DP82TS7u5Cz3py1HV0kDjiJf50iRKstg-UGII1Fv8__7_MTtsHi3cLU3jGiR8_B_ZcLJrALlcy90JlsnNaQSdfn0WcXZavcPMOQ8yQW1MKCAOXXeU6lnKF5MSxsWeb5F82drhpJxmoHfac2jIHLMPsZ5TAnrz2fy2xaIS5847ocSUTKOSu4zz8DCdTd1DaBMifmzqBpbt-wxXxFNhqWzZjDhrjZZiOAdIhMvUeBMWNVJfleVkN6s_IxOzQmQD5409P4acMdAwImkXOTPoP-9AeXOsZrU4nlIDU0g=w2000-h1386"
   
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

