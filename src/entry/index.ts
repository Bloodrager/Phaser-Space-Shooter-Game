import '../../assets/html/style.css'
import * as Phaser from 'phaser'

const config : Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT
    },
    width: 1920,
    height: 1080
}

export default new Phaser.Game(config)
