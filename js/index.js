window.addEventListener('load', () => {
  const sounds = document.querySelectorAll('.sound');
  const pads = document.querySelectorAll('.pad');
  const visual = document.querySelector('.visual');
  // const rec = document.querySelector('.rec');
  // const play = document.querySelector('.play');
  // const reset = document.querySelector('.reset');
  const colors = [
    '#60d394',
    '#d36060',
    '#c060d3',
    '#d3d160',
    '#6860d3',
    '#60b2d3'
  ];

  // const arr = [];

  //Перебераем список с цветными падами и навешиваем обработчик на каждый пад и функцию воспроизвдения музыки
  pads.forEach((pad, index) => {
    pad.addEventListener('click', function() {
      sounds[index].currentTime = 0;
      sounds[index].play();

      createBubbles(index);
      // return arr.push(sounds[index]);
    });
  });

  // rec.addEventListener('click', function() {
  //   console.log(arr);
  // });

  // play.addEventListener('click', function() {
  //   arr.forEach((sound, index) => {
  //     console.log(sound);
  //     sound.play();
  //   });
  // });

  // reset.addEventListener('click', function() {
  //   arr.splice(0, arr.length);
  //   console.log(arr);
  // });

  //Функция для создания цветного шарика
  const createBubbles = (index) => {
    const bubble = document.createElement('div');
    visual.appendChild(bubble);
    bubble.style.backgroundColor = colors[index];
    bubble.style.animation = 'jump 1s ease';
    bubble.addEventListener('animationend', function() {
      visual.removeChild(this);
    });
  };
});
