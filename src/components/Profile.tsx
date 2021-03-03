/* eslint-disable react/require-default-props */
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Profile.module.css';

interface ProfileProps {
  nameProp?: string;
  avatarUrlProp?: string;
  levelProp?: number;
}

export function Profile({ nameProp, avatarUrlProp, levelProp }: ProfileProps): JSX.Element {
  const { level } = useContext(ChallengesContext);
  const { avatarUrl, name } = useContext(UserContext);

  const image = avatarUrlProp || avatarUrl || '../icons/anonymous.png';

  return (
    <div className={styles.profileContainer}>
      <img src={`${image}`} alt={`foto no github referente a ${name}`} />
      <div>
        <strong>
          {' '}
          {nameProp || name || 'user anônimo'}
          {' '}
        </strong>
        <p>
          <img src="../icons/level.svg" alt="icon de Level" />
          Level
          {' '}
          { levelProp || level}
        </p>
      </div>
    </div>
  );
}
