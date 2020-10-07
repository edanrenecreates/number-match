const images = [
  {
    image_name: 'bananas.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'birthday candles.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'blocks.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'brushes.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'cakes.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'cars.jpg',
    number_of_items: 2,
  },
  {
    image_name: 'crayons.jpg',
    number_of_items: 8,
  },
  {
    image_name: 'cupcakes.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'deer.jpg',
    number_of_items: 3,
  },
  {
    image_name: 'donuts.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'ducks.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'eggs.jpg',
    number_of_items: 8,
  },
  {
    image_name: 'elephants.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'hot air balloons.jpg',
    number_of_items: 5,
  },
  {
    image_name: 'jelly beans.jpg',
    number_of_items: 9,
  },
  {
    image_name: 'macaroons.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'pencils.jpg',
    number_of_items: 12,
  },
  {
    image_name: 'people.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'peppers.jpg',
    number_of_items: 2,
  },
  {
    image_name: 'pizza slices.jpg',
    number_of_items: 8,
  },
]

const timeDelay = 3000;
let currentImageValue = 0,
displayNumber = 0,
score = 0,
totalAvailable = images.length,
chosen = false;

document.getElementById('statsContent').style.visibility = 'hidden';
document.getElementById('currentScore').innerHTML = score;
document.getElementById('totalAvailable').innerHTML = totalAvailable;
document.getElementById('timeSetting').innerHTML = timeDelay/ 1000;

const setImageSrc = (randomImageName) => {
  const imageContainer = document.getElementById('imageContainer')
  if (imageContainer.hasChildNodes()) {
    imageContainer.removeChild(imageContainer.firstChild);
  }
  const image = document.createElement('img');
  image.src = `images/${randomImageName}`;
  imageContainer.appendChild(image);
};

const generatePlusOrMinus = () => {
  const number0to1 = Math.floor(Math.random() * 2)
  return number0to1 === 0 ? -1 : +1;
};

generateDisplayNumber = (numberOfItems, plusOrMinus) => {
  const split = Math.floor(Math.random() * 2)
  if (split === 0) {
    // display real number
    document.getElementById('number').innerHTML = numberOfItems + " " ;
    displayNumber = numberOfItems;
  }else {
    // display one higher or one lower
    document.getElementById('number').innerHTML =`${
       numberOfItems + plusOrMinus + " "}`;
       displayNumber = numberOfItems + plusOrMinus;
  }
  currentImageValue = numberOfItems;
};
//Set images name
const setImageName = (randomImageName) => {
  const imageName = randomImageName.slice(0,randomImageName.length -4);//removes the jpg from the name and generate just the name
  document.getElementById('item-name').innerHTML = imageName + "?";
}

const generate = () => {

  if (images.length === 0) {
    endOfGame();
    stopTimer();
    return;
  }
  chosen = false;
  // Create random image from image array
  const randomNumber = Math.floor(Math.random() * images.length);
  const randomImageName = images[randomNumber].image_name;
  setImageSrc(randomImageName);
  setImageName(randomImageName);
  const plusOrMinus = generatePlusOrMinus();
  const numberOfItems = images[randomNumber].number_of_items;
  generateDisplayNumber(numberOfItems, plusOrMinus);
  images.splice(randomNumber, 1); 
};

//Will update the score it if IS a match
const match = ()  => {
  if(!chosen) {
    currentImageValue === displayNumber ? score++ : score--
    chosen = true;
    document.getElementById('currentScore').innerHTML = score;
  }
};

//will update the score if it is NOT a match
const noMatch = ()  => {
  if(!chosen){
    currentImageValue !== displayNumber ? score++ : score--
    chosen = true;
    document.getElementById('currentScore').innerHTML = score
  }
};


let timerRef
const timer = () => {
  timerRef = setInterval(generate, timeDelay)
};

const play = () => {
  document.getElementById('message').style.display = "none";
  document.getElementById('startScreen').style.display = "none";
  document.getElementById('play-button').style.display = "none";
  document.getElementById('statsContent').style.visibility = 'visible';

  generate();
  timer();
};

const endOfGame = () => {
  document.getElementById('statsContent').style.visibility = 'hidden';
  document.getElementById('message').style.display = "block";
  document.getElementById('imageContainer').style.display = "none";
  document.getElementById("statsContent").style.display = "none";
  document.getElementById('message').innerHTML = `Game over, your score was ${score}/${totalAvailable}`;
  setTimeout(() => location.reload(), 3000)
}

const stopTimer = () => {
  clearInterval(timerRef);
};