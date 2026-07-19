/*=========================================================
        Surprise Letter
        Version : 1.0
=========================================================*/

'use strict';

/*=========================================================
        DOM
=========================================================*/

const envelope = document.querySelector('#envelope');

const flap = document.querySelector('.envelope-flap');

const seal = document.querySelector('.seal');

const letterWrapper = document.querySelector('#letterWrapper');

const paper = document.querySelector('#letterPaper');

const typingArea = document.querySelector('#typingArea');

const candles = document.querySelectorAll('.candle');

const flames = document.querySelectorAll('.flame');

const glows = document.querySelectorAll('.glow');

const music = document.querySelector('#bgMusic');

const openSound = document.querySelector('#openSound');

const scene = document.querySelector('#scene');

const particles = document.querySelector('#particles');

const stars = document.querySelector('#stars');

/*=========================================================
        CONFIG
=========================================================*/

const CONFIG={

openDuration:900,

letterDuration:1200,

closeDuration:900,

typingSpeed:35,

paragraphDelay:900,

allowReplay:true,

debug:false

};

/*=========================================================
        STATES
=========================================================*/

const STATE={

closed:'closed',

opening:'opening',

opened:'opened',

typing:'typing',

closing:'closing'

};

/*=========================================================
        APP
=========================================================*/

class LetterApp{

constructor(){

this.state=STATE.closed;

this.isBusy=false;

this.musicStarted=false;

this.paragraph=0;

this.init();

}

init(){

this.reset();

this.bind();

this.prepare();

}

prepare(){

envelope.classList.remove('open');

envelope.classList.remove('closing');

letterWrapper.classList.remove('show');

letterWrapper.classList.add('hide');

}

reset(){

this.state=STATE.closed;

this.isBusy=false;

this.paragraph=0;

}

bind(){

envelope.addEventListener(

'click',

()=>this.open()

);

document.addEventListener(

'keydown',

e=>{

if(e.code==="Space"){

e.preventDefault();

this.open();

}

}

);

}

canRun(){

return !this.isBusy;

}

setBusy(value){

this.isBusy=value;

}

changeState(value){

this.state=value;

if(CONFIG.debug){

console.log(

'STATE :',

value

);

}

}

sleep(ms){

return new Promise(

resolve=>{

setTimeout(

resolve,

ms

);

}

);

}

/*==============================
در مرحله بعد کامل می‌شود
==============================*/

async open(){

}

async showLetter(){

}

async close(){

}

}

/*=========================================================
        START
=========================================================*/

const app=new LetterApp();
/*=========================================================
        OPEN ENVELOPE
=========================================================*/

async open(){

    if(!this.canRun()) return;

    if(this.state!==STATE.closed) return;

    this.setBusy(true);

    this.changeState(STATE.opening);

    /* شروع موزیک */

    if(music && !this.musicStarted){

        this.musicStarted=true;

        music.volume=.35;

        music.play().catch(()=>{});

    }

    /* صدای باز شدن */

    if(openSound){

        openSound.currentTime=0;

        openSound.play().catch(()=>{});

    }

    /* باز شدن پاکت */

    envelope.classList.add("open");

    await this.sleep(CONFIG.openDuration);

    await this.showLetter();

}

/*=========================================================
        SHOW LETTER
=========================================================*/

async showLetter(){

    letterWrapper.classList.remove("hide");

    letterWrapper.classList.add("show");

    paper.classList.add("visible");

    await this.sleep(CONFIG.letterDuration);

    this.changeState(STATE.opened);

    this.setBusy(false);

    /* مرحله ۸ */

    if(typeof startTyping==="function"){

        startTyping();

    }

}
