import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';
import { Button } from './Button';

export function ChallengeBox(): JSX.Element {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSuccessed() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <div className={styles.challengeDescription}>
            <header>
              Ganhe
              {activeChallenge.amount}
              {' '}
              xp
            </header>

            <main>
              <img src={`icons/${activeChallenge.type}.svg`} alt="" />
              <strong>Novo Desafio</strong>
              <p>
                {' '}
                {activeChallenge.description}
                {' '}
              </p>
            </main>
          </div>

          <footer>
            <Button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
              value="Falhei"
            />
            <Button
              type="button"
              className={styles.challengeSuccessedButton}
              onClick={handleChallengeSuccessed}
              value="Completei"
            />
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong> Finalize um ciclo para receber um desafio </strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
