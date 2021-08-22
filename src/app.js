import './styles.css'
import { ContextMenu } from './menu'
import { counterClick } from './modules/clicks.module'
import { counterClickvvv } from './modules/shape.module'
//import { currencyModule } from './modules/currency.module'
import { FigureModule } from './modules/figure.module'
import { BackgroundColorModule } from './modules/backgroundColor.module'
import { BackgroundModule } from './modules/background.module'

const menu = new ContextMenu()
const figureModule = new FigureModule()
const backgroundColorModule = new BackgroundColorModule()
const backgroundModule = new BackgroundModule()

// console.log(menu);
export default menu
//const menuList = [counterClick, counterClickvvv];
const menuList = [
	counterClick,
	backgroundModule,
	//shapeModule,
	//currencyModule,
	figureModule,
	backgroundColorModule
]
// hi.render();
menuList.forEach(el => el.addItemInMenuList())
menu.render()
