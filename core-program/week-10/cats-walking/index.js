import WalkingCat from './ui.js ';

const DANCE_TIME_MS = 5000;
const STEP_SIZE_PX = 10;

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function walk(cat, startPos, stopPos) {
  const stepInterval = 40 + 12 * cat.num;
  let position = startPos;
  while (position < stopPos) {
    cat.moveTo(position);
    await wait(stepInterval);
    position += STEP_SIZE_PX;
  }
}

async function dance(cat) {
  cat.showDancing();
  await wait(DANCE_TIME_MS);
  cat.showWalking();
}

async function catWalk(catNum) {
  const cat = new WalkingCat(catNum);
  const startPos = -cat.width;
  const centerPos = (window.innerWidth - cat.width) / 2;
  const stopPos = window.innerWidth;

  cat.showWalking();
  await walk(cat, startPos, centerPos);
  await dance(cat);
  await walk(cat, centerPos, stopPos);
  cat.remove();
}

const NUM_CATS = 3;

async function catsWalk() {
  while (true) {
    const promises = [];
    for (let i = 0; i < NUM_CATS; i++) {
      promises.push(catWalk(i));
    }

    await Promise.all(promises);
  }
}

WalkingCat.onStart(catsWalk);
