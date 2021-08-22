import menu from '../app'
import { Module } from '../core/module'
import { randomImages } from '../utils'

const backgroundColorArr = [
	'#C0C0C0',
	'#FF0000',
	'#00FF00',
	'#FFFF00',
	'#00FFFF'		
]

export class BackgroundColorModule extends Module {
	constructor(type, text) {
		super('backgroundColor', 'случайный фон')
	}

	#changeBackgroundColor() {
		const index = randomImages(0, 4)
		document.body.style.background = backgroundColorArr[index]
	}

	#trigger() {
		this.#changeBackgroundColor(this.index)
		this.toHTML()
	}

	addItemInMenuList() {
		menu.add(`Случайный фон`, this.#trigger.bind(this))
	}
	
}
