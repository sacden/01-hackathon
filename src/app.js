import './styles.css'
import {ContextMenu} from './menu'


const menu = document.querySelector(".menu");
let menuVisible = false;

const toggleMenu = command => {
  menu.style.display = command === "show" ? "block" : "none";
  menuVisible = !menuVisible;
};

const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  toggleMenu("show");
};

window.addEventListener("click", e => {
  if (menuVisible) toggleMenu("hide");
});

menu.addEventListener("mouseover", e => {
    //console.log("mouse-option", e.target.innerHTML);
});

menu.addEventListener("click", e => {
  //console.log("li-option", e.target.innerHTML);
  switch(e.target.innerHTML){
    case 'Аналитика кликов':
        console.log("Аналитика кликов");
        const cont = new ContextMenu()
        cont.open()
        break;
    case 'Случайная фигура':
        console.log("Случайная фигура");
        break;
    case 'Таймер отсчета':
        console.log("Таймер отсчета");
        break;
    case 'Случайный звук':
        console.log("Случайный звук");
        break;
    case 'Случайный фон':
        console.log("Случайный фон");
        break;
    case 'Кастомное сообщение':
        console.log("Кастомное сообщение");
        break;
    case 'Собственный модуль':
        console.log("Собственный модуль");
        break;
    default:
        console.log("default");
}
});

window.addEventListener("contextmenu", e => {
  e.preventDefault();
  const originPosition = {
    left: e.pageX,
    top: e.pageY
  };
  setPosition(originPosition);
  return false;
});
