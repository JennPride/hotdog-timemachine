/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} totalWidth 
 * @param {string} texture 
 * @param {number} scrollFactor 
 */
export const createAligned = (scene: Phaser.Scene, totalWidth: number, texture: any, scrollFactor: any) => {
	const w = scene.textures.get(texture).getSourceImage().width
	const count = Math.ceil(totalWidth / w) * scrollFactor

	let x = 0
	for (let i = 0; i < count; ++i)
	{
		const m = scene.add.image(x, scene.scale.height, texture)
			.setOrigin(0, 1)
			.setScrollFactor(scrollFactor)

		x += m.width
	}
}

export const RAINBOW_BRIGADE = [0xFF0000, 0xFFA500, 0xFFFF00, 0x008000, 0x0096FF, 0x6D5ACF, 0xee82ee]

export async function rainbowEffect(obj: any, iterations: number) {
    let i = 0;
    while (i < iterations) {
        await iterateThroughRainbow(obj)
        i++
    }
    obj.clearTint()
}

async function iterateThroughRainbow(obj: any) {
    for (let i = 0; i < RAINBOW_BRIGADE.length-1; i++) {
        obj.setTint(RAINBOW_BRIGADE[i], RAINBOW_BRIGADE[i], RAINBOW_BRIGADE[i+1], RAINBOW_BRIGADE[i+1])
        await new Promise(f => setTimeout(f, 100));
    }
}
