const WALKING_CAT_URL =
  'http://www.anniemation.com/clip_art/images/cat-walk.gif';
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';
const IMAGE_WIDTH = 300;

class WalkingCat {
  #num;
  #img;

  constructor(catIndex) {
    this.#num = catIndex;
    const top = catIndex * 220;
    this.#img = document.createElement('img');
    this.#img.style.position = 'absolute';
    this.#img.style.top = `${top}px`;
    this.#img.style.left = `${-IMAGE_WIDTH}px`;
    document.body.append(this.#img);
  }

  get width() {
    return IMAGE_WIDTH;
  }

  get num() {
    return this.#num;
  }

  moveTo(position) {
    this.#img.style.left = `${position}px`;
  }

  showDancing() {
    this.#img.src = DANCING_CAT_URL;
  }

  showWalking() {
    this.#img.src = WALKING_CAT_URL;
  }

  remove() {
    this.#img.remove();
  }

  static onStart(startHandler) {
    document.querySelector('button').addEventListener('click', startHandler);
  }
}

export default WalkingCat;
