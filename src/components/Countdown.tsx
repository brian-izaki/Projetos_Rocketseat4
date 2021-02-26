import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown(): JSX.Element {
  const {
    minutes,
    seconds,
    hasFinish,
    isActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  const [minuteleft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondleft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>
            {' '}
            {minuteleft}
            {' '}
          </span>
          <span>
            {' '}
            {minuteRight}
            {' '}
          </span>
        </div>
        <span>:</span>
        <div>
          <span>
            {' '}
            {secondleft}
            {' '}
          </span>
          <span>
            {' '}
            {secondRight}
            {' '}
          </span>
        </div>
      </div>

      {hasFinish ? (
        <button type="button" disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar o ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
