class Game {
    constructor(elem, count, countCards, buttonElem) {
        this.elem = elem;
        this.steps = count;
        this.countCards = countCards;
        this.elemSteps = document.body.querySelector('.score');
        this.elemSteps.innerHTML = 0;

        this.buttonElem = buttonElem;
        this.buttonElem.innerHTML = 'Clear and restart';

        this.timeCheckPoint = true;
        this.arrRemoveCards = [];
        this.openCards = new Set();

        this.flipElem = this.flipElem.bind(this);
        this.elem.addEventListener('click', this.flipElem);
    }

    flipElem(evt) {
        evt.preventDefault();
        this.el = evt.target;
        if (!this.el.classList.contains('front')) return;

        if (!this.timeCheckPoint) return;
        this.timeCheckPoint = false;
        setTimeout(() => this.timeCheckPoint = true, 400);

        this.el.parentNode.classList.toggle('flipped');
        this.steps += 1;
        this.elemSteps.innerHTML = this.steps;

        if (this.openCards.size > 0) {
            this.openCards.forEach(elem => {
                if (elem.dataset.name === this.el.parentNode.dataset.name) {
                    this.arrRemoveCards.push(elem, this.el.parentNode);

                    setTimeout(() => {
                        this.arrRemoveCards.forEach(card => card.remove());
                        this.arrRemoveCards = [];
                    }, 700);

                    this.openCards.delete(elem);
                    this.countCards -= 2;
                }
            });

            if (this.openCards.size > 1) {
                this.openCards.forEach(elem => {
                    elem.classList.toggle('flipped');
                });
                this.openCards.clear();
            }

            if (this.countCards === 0) {
                setTimeout(() => alert('You Win!'), 1000);
                setTimeout(() => this.elem.remove(), 1500);

                this.buttonElem.innerHTML = 'Start the game again?';
            }
        }

        if (this.el.parentNode.dataset.name) {
            this.openCards.add(this.el.parentNode);
        }
    }
}

const initialGame = (parenElem, count, countCards) => {
    const buttonElem = document.querySelector('.start__button');
    return new Game(parenElem, count, countCards, buttonElem);
};


class BuildPlayingField {
    constructor({elem, classButton, fieldParent, countSteps, elemSteps, arrayAttributes}) {
        this.elem = elem;
        this.classButton = classButton;
        this.fieldParent = fieldParent;
        this.countSteps = countSteps;
        this.elemSteps = elemSteps;
        this.arrAttr = arrayAttributes;
        this.countCards = this.arrAttr.length;

        this.beginGame = this.beginGame.bind(this);
        this.elem.addEventListener('click', this.beginGame);
    }

    beginGame(evt) {
        this.el = evt.target;
        if (this.el.className !== this.classButton) return;

        if (this.fieldParent.lastChild) {
            this.fieldParent.remove();
            this.fieldParent = document.createElement('div');
            this.fieldParent.classList.add('playing__field');
            document.querySelector('.content').append(this.fieldParent);
            this.countSteps = 0;
        }

        this.arrAttr.sort(function() { return 0.5 - Math.random() });
        let template = ``;
        for (let count = 0; count < this.arrAttr.length; count++) {
            template += `<section class="container__flip">
                            <div class="card" data-name=${this.arrAttr[count].dataset}>
                                <div class="front"></div> 
                                <div class="back">
                                    <img src=${this.arrAttr[count].path}>
                                </div>                                                          
                             </div>
                        </section>`;
        }
        this.fieldParent.insertAdjacentHTML(`afterBegin`, template);
        document.body.querySelector('.text__score').hidden = false;

        initialGame(this.fieldParent, this.countSteps, this.countCards, this.buttonElem);
    }

}

const initialTask = () => {
    const value = {
        elem: document.querySelector('.content'),
        classButton: 'start__button',
        fieldParent: document.querySelector('.playing__field'),
        countSteps: 0,
        arrayAttributes: [
            {dataset: "linux", path: "img/linux.svg"},
            {dataset: "linux", path: "img/linux.svg"},
            {dataset: "google", path: "img/google.svg"},
            {dataset: "google", path: "img/google.svg"},
            {dataset: "html5", path: "img/html5.svg"},
            {dataset: "html5", path: "img/html5.svg"},
            {dataset: "firefox", path: "img/firefox.svg"},
            {dataset: "firefox", path: "img/firefox.svg"},
            {dataset: "apple", path: "img/apple.svg"},
            {dataset: "apple", path: "img/apple.svg"},
            {dataset: "vue", path: "img/vue.svg"},
            {dataset: "vue", path: "img/vue.svg"},
            {dataset: "webpack", path: "img/webpack.svg"},
            {dataset: "webpack", path: "img/webpack.svg"},
            {dataset: "github", path: "img/github.svg"},
            {dataset: "github", path: "img/github.svg"}
        ]
    };

    return new BuildPlayingField(value);
};

initialTask();
