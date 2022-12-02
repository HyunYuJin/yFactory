import EventEmitter from './events'
import {
  Configs,
  Nodes
} from './types'

class Player extends EventEmitter {
  public nodes: Nodes

  constructor(
    public media: HTMLElement | HTMLAudioElement,
    public config: Configs
  ) {
    super()

    this.nodes = {}
    this.config = config

    this.init()
  }

  private init () { 
    
  }

  private initPlayer () { 
    
  }

  private initEvents () { 

  }
}

export default Player