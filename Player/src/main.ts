import Player from './player'
import { defaultConfigs } from './configs'
import './utils'
import './styles/style.scss'

const configs = Object.assign({
  autoplay: false
}, defaultConfigs)

const media = new Audio()

const player = new Player(media, configs)
console.log(player)