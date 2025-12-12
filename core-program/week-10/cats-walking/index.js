const STEP_SIZE_PX = 10;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function walk(img, startPos, stopPos, stepInterval) {
  let position = startPos;
  while (position < stopPos) {
    img.style.left = `${position}px`;
    position += STEP_SIZE_PX;
    await wait(stepInterval * 4);
  }
}

async function dance(img) {
  const savedSrc = img.src;
  img.src = DANCING_CAT_URL;
  await wait(DANCE_TIME_MS);
  img.src = savedSrc;
}

async function catWalk(catIndex = 0) {
  const top = catIndex * 220;
  const stepInterval = 20 - catIndex * 3;
  const img = document.createElement('img');
  img.src = 'http://www.anniemation.com/clip_art/images/cat-walk.gif';
  const imgWidth = 300;
  img.style.top = `${top}px`;
  img.style.left = `${-imgWidth}px`;
  document.body.append(img);

  const startPos = -imgWidth;
  const centerPos = (window.innerWidth - imgWidth) / 2;
  const stopPos = window.innerWidth;

  await walk(img, startPos, centerPos, stepInterval, catIndex);
  await dance(img, catIndex);
  await walk(img, centerPos, stopPos, stepInterval, catIndex);
  return img.remove();
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

document.querySelector('button').addEventListener('click', catsWalk);
