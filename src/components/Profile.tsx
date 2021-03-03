/* eslint-disable react/require-default-props */
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Profile.module.css';

interface ProfileProps {
  nameProp?: string;
  avatarUrlProp?: string;
}

export function Profile({ nameProp, avatarUrlProp }: ProfileProps): JSX.Element {
  const { level } = useContext(ChallengesContext);
  const { avatarUrl, name } = useContext(UserContext);

  const image = avatarUrl || avatarUrlProp || '../icons/anonymous.png';

  return (
    <div className={styles.profileContainer}>
      <img src={`${image}`} alt={`foto no github referente a ${name}`} />
      <div>
        <strong>
          {' '}
          {name || nameProp || 'user anônimo'}
          {' '}
        </strong>
        <p>
          <img src="../icons/level.svg" alt="icon de Level" />
          Level
          {' '}
          {level}
        </p>
      </div>
    </div>
  );
}
