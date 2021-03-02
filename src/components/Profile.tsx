import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(): JSX.Element {
  const { level } = useContext(ChallengesContext);
  const { avatarUrl, name } = useContext(UserContext);

  return (
    <div className={styles.profileContainer}>
      <img src={`${avatarUrl}`} alt={`foto no github referente a ${name}`} />
      <div>
        <strong>
          {' '}
          {name}
          {' '}
        </strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level
          {' '}
          {level}
        </p>
      </div>
    </div>
  );
}
