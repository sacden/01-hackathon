export class Menu {
  constructor(selector) {
    this.el = document.querySelector(selector)

    document.body.addEventListener('click', event => {
      console.log('event from parent menu', event)
      if (event.target.offsetParent !== this.el) {
        this.close()
      }
    })
  }

  open() {
    console.log('open from parent menu')
    //throw new Error(`"open" method should be implemented in Menu"`)
  }

  close() {
    console.log('close from parent menu')
    //throw new Error(`"close" method should be implemented in Menu"`)
  }

  add() {
    console.log('add from parent menu')
    //throw new Error(`"add" method should be implemented in Menu"`)
  }
}