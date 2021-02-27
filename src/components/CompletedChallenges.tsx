import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';
import { formatToTwoZero } from '../utils/formatText';

export function CompletedChallenges(): JSX.Element {
  const { challengesCompleted } = useContext(ChallengesContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>

      <span>{ formatToTwoZero(challengesCompleted) }</span>
    </div>
  );
}
