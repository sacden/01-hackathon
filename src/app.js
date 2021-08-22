import "./styles.css";
import { ContextMenu } from "./menu";
import { counterClick } from "./modules/clicks.module";
import { counterClickvvv } from "./modules/shape.module";
import {backgroundModule} from "./modules/background.module";
import {weatherModule} from "./modules/weather.module";

const menu = new ContextMenu();

// console.log(menu);
export default menu;
const menuList = [counterClick, counterClickvvv, backgroundModule,weatherModule];
// hi.render();
menuList.forEach((el) => el.addItemInMenuList());
menu.render();

