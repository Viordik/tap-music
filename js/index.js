window.addEventListener('load', () => {
  const soundElements = document.querySelectorAll('.sound');
  const pads = document.querySelectorAll('.pad');
  const visual = document.querySelector('.visual');
  const rec = document.querySelector('.rec');
  const play = document.querySelector('.play');
  const reset = document.querySelector('.reset');
  const colors = [
    '#60d394',
    '#d36060',
    '#c060d3',
    '#d3d160',
    '#6860d3',
    '#60b2d3'
  ];

  const makeStore = (state = {}) => {
    const subscribers = [];

    const subscribe = (fn) => {
      if (typeof fn === 'function') {
        subscribers.push(fn);
      }
    };

    const setState = (newState = {}) => {
      state = typeof newState === 'function'
        ? {...state, ...newState(state)}
        : {...state, ...newState};

      subscribers.forEach((fn) => {
        fn(state);
      });
    };

    const getState = () => {
      return state;
    };

    return {
      getState,
      subscribe,
      setState
    };
  };

  const store = makeStore({
    sounds: [],
    isRecord: false,
    isPlay: false
  });

  store.subscribe((state) => {
    if (state.isPlay || state.sounds.length === 0) {
      play.disabled = true
      play.style.backgroundColor = 'gray';
    } else {
      play.disabled = false;
      play.style.backgroundColor = '#add8e6';
    }
  });

  //Перебераем список с цветными падами и навешиваем обработчик на каждый пад и функцию воспроизвдения музыки
  pads.forEach((pad, index) => {
    pad.addEventListener('click', function() {
      soundElements[index].currentTime = 0; //Запускаем проеигравание музыки с начала, при повторном нажатие на pad или многократном нажатие
      soundElements[index].play();

      createBubbles(index); //Создание шарика

      if (store.getState().isRecord) {
        store.setState((oldState) => {
          const sounds = [...oldState.sounds, soundElements[index]];

          return { sounds };
        });
      }
    });
  });

  store.subscribe((state) => {
      rec.style.backgroundColor = state.isRecord ? 'red' : '#add8e6'; //Если isRecord = true то присваиваем background красный цвет, т.е. при нажатие на кнопку rec background будет красным
  });

  rec.addEventListener('click', function() {
    store.setState((oldState) => {
      return {
        isRecord: !oldState.isRecord
      };
    });
  });

  function playSounds(sounds = []) {
    if (sounds.length === 0) {
      store.setState({
        isPlay: false
      });

      return;
    }

    if (!store.getState().isPlay) {
      store.setState({
        isPlay: true
      })
    }

    const sound = sounds.shift();

    sound.currentTime = 0;
    sound.play();

    sound.addEventListener('ended', () => {
      playSounds(sounds);
    }, { once: true });
  }

  play.addEventListener('click', function() {
    playSounds([...store.getState().sounds]);
  });

  reset.addEventListener('click', function() {
    store.setState({
      sounds: []
    });
  });

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

  store.setState({});
});
