import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';
import { Button } from './Button';

export function Countdown(): JSX.Element {
  const {
    INITIAL_TIME,
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
        <Button
          value="Ciclo encerrado"
          type="button"
          disabled
          className={styles.countdownButton}
        />
      ) : (
        <>
          {isActive ? (
            <>
              <Button
                value="Abandonar o ciclo"
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              />
              <div className={styles.countdownButtonTimeTransition}>
                <div style={{ animationDuration: `${INITIAL_TIME}s` }} />
              </div>
            </>
          ) : (
            <Button
              value="Iniciar um ciclo"
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            />
          )}
        </>
      )}
    </div>
  );
}
