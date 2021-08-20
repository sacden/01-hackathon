import {Menu} from './core/menu'

export class ContextMenu extends Menu {
    super(selector){
        this.el = document.querySelector(selector)

        document.body.addEventListener('click', event => {
          console.log('event from extended menu', event)
          if (event.target.offsetParent !== this.el) {
            this.close()
          }
        })

    }

    open() {
        console.log('open from extended menu')
        //throw new Error(`"open" method should be implemented in Menu"`)
      }
    
      close() {
        console.log('close from extended menu')
        //throw new Error(`"close" method should be implemented in Menu"`)
      }
    
      add() {
        console.log('add from extended menu')
        //throw new Error(`"add" method should be implemented in Menu"`)
      }


}