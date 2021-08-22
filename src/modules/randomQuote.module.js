import { Module } from "../core/module";

const phrases = [
    'Тото, у меня такое ощущение, что мы больше не в Канзасе',
    'Да пребудет с тобой Сила!',
    'Хьюстон, у нас проблема',
    'Carpe diem. Ловите момент, мальчики. Сделайте свою жизнь экстраординарной!',
    'Улыбаемся и машем!',
    'Всё будет хорошо, я узнавала'
]
export class RandomQuote extends Module {
  constructor(type, text) {
    super(type, text);
  }

  getRandomQuote(){
    let i = Math.floor(Math.random() * phrases.length);
    let quiteToShow = phrases[i];
    console.log(quiteToShow, 'quoteToShow');
    return quiteToShow;
  }

  showQuote(){
     this.getRandomQuote();
     let body = document.querySelector('body');
     let div = document.createElement('div');
     div.innerHTML = this.getRandomQuote();
     div.style.paddingLeft = '30px';
     div.style.position = 'relative';
     div.style.font = "italic bold 20px arial,serif"
     div.classList.add('quote');
     body.append(div);
  }

  removeQuote(){
    const countDivs = document.querySelectorAll('.quote');
    countDivs.forEach((div) =>{
      setTimeout(() => { div.remove(); }, 3000);
    })
  }

  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
  }

  addItemInMenuList() {
    return {
      text: this.toHTML.bind(this),
      trigger: this.trigger.bind(this),
    };
  }

  trigger() {
    this.showQuote();
    this.removeQuote();
  }
}
