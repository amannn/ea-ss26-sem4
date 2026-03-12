import {useEffect, useState} from 'react';
import Sound from './Sound';

export default function App() {
  // Sync in: Mouse to app
  const isMouseDown = useMouseDown();

  // Sync in: Keyboard to app
  const isSpaceDown = useKeyDown('Space');

  const isActive = isMouseDown && isSpaceDown;

  // Sync out: App to sound API
  useTheremin(isActive);

  useDiscoBackground(isActive);

  let emoji;
  if (isActive) {
    emoji = '🪩💃🏻🕺';
  } else {
    emoji = '🙄';
  }

  const somethingIsMissing =
    (isMouseDown && !isSpaceDown) || (!isMouseDown && isSpaceDown);

  return (
    <div>
      <p
        style={{
          fontSize: 40,
          textAlign: 'center',
          margin: '80px 0',
          userSelect: 'none'
        }}
      >
        {emoji}
      </p>
      {somethingIsMissing && <p>Please put down both space and mouse</p>}
    </div>
  );
}

function useKeyDown(keyCode: string) {
  const [isKeyDown, setIsKeyDown] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isCorrectKey = event.code === keyCode;
      if (isCorrectKey) {
        setIsKeyDown(true);
      }
    }

    function onKeyUp(event) {
      const isCorrectKey = event.code === keyCode;
      if (isCorrectKey) {
        setIsKeyDown(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  });

  return isKeyDown;
}

function useTheremin(isActive = false) {
  useEffect(() => {
    // 1st render: isMouseDown: false
    // 2st render: isMouseDown: true
    if (isActive) {
      const sound = new Sound();
      sound.play();
      sound.setFrequency(440);
      sound.setGain(0.5);

      function onMouseMove(event: MouseEvent) {
        const px = event.clientX / window.innerWidth;
        const py = event.clientY / window.innerHeight;

        const minFrequency = 440;
        const maxFrequency = minFrequency * 3;
        const frequency = minFrequency + (maxFrequency - minFrequency) * px;

        const gain = 1 - py;

        sound.setFrequency(frequency);
        sound.setGain(gain);
      }

      window.addEventListener('mousemove', onMouseMove);

      return () => {
        // Always clean up after the party
        window.removeEventListener('mousemove', onMouseMove);
        sound.dispose();
      };
    }
  }, [isActive]);
}

const DISCO_COLORS = ['#ff006e', '#8338ec', '#3a86ff', '#06d6a0', '#ffd60a'];

function useDiscoBackground(isActive: boolean) {
  const fadeDuration = 800;

  useEffect(() => {
    if (!isActive) {
      document.body.style.transition = '';
      document.body.style.backgroundColor = '';
      return;
    }

    document.body.style.transition = `background-color ${fadeDuration}ms ease`;
    let index = 0;
    document.body.style.backgroundColor = DISCO_COLORS[0];

    const interval = setInterval(() => {
      index = (index + 1) % DISCO_COLORS.length;
      document.body.style.backgroundColor = DISCO_COLORS[index];
    }, fadeDuration);

    return () => {
      clearInterval(interval);
      document.body.style.transition = '';
      document.body.style.backgroundColor = '';
    };
  }, [isActive]);
}

function useMouseDown() {
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    function onMouseDown() {
      setIsMouseDown(true);
    }

    function onMouseUp() {
      setIsMouseDown(false);
    }

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  });

  return isMouseDown;
}
