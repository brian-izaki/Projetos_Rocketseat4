import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  INITIAL_TIME: number;
  minutes: number;
  seconds: number;
  hasFinish: boolean;
  isActive: boolean;
  startCountdown(): void;
  resetCountdown(): void;
}

interface CountdownProvider {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);
// tipagem nativa do js
let countdownTimeout: NodeJS.Timeout;
const INITIAL_TIME = 0.05 * 60;

export function CountdownProvider({ children }: CountdownProvider): JSX.Element {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    // limpa o valor de um timeout
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinish(false);
    setTime(INITIAL_TIME);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      // o timeout é executado e seu valor armazenado na variável para ter controle sobre ele.
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinish(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, startNewChallenge, time]);

  return (
    <CountdownContext.Provider
      value={{
        INITIAL_TIME,
        minutes,
        seconds,
        hasFinish,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
