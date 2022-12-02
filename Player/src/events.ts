interface Events {
  [key: string]: Function[]
}

export default class EventEmitter {
  public events: Events
  static on: any
  static emit: any
  constructor (events?: Events) {
    this.events = events || {}
  }

  public on (name: string, callback: Function) {
    (this.events[name] || (this.events[name] = [])).push(callback)
  }

  public emit (name: string, ...args: any[]): void {
    (this.events[name] || []).forEach(fn => fn(...args))
  }

  public off (name: string, callback: Function): void {
    (this.events[name] || []).forEach((fn, i) => {
      if (fn === callback) this.events[name].splice(i, 1)
    })
  }
}