/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { MenuBar } from '../../components/MenuBar';
import { Profile } from '../../components/Profile';
import styles from '../../styles/pages/LeaderBoard.module.css';

interface UserCardTable {
  position: number;
  completedChallenges: number;
  experience: number;
  nameProps: string;
  avatarUrlProps: string;
}

const UserTableCard: React.FC<UserCardTable> = ({
  position,
  completedChallenges,
  experience,
  nameProps,
  avatarUrlProps,
}: UserCardTable) => (
  <tr>
    <td>{position}</td>

    <td>
      <div>
        <Profile nameProp={nameProps} avatarUrlProp={avatarUrlProps} />
      </div>
    </td>

    <td>
      <span>{completedChallenges}</span>
    </td>

    <td>
      <span>{experience}</span>
      {' '}
      xp
    </td>
  </tr>
);

export default function LeaderBoard(): JSX.Element {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then((usersRes) => {
        setUsers(usersRes.data.users);
      });
  }, []);

  return (
    <>
      <Head>
        <title>LeaderBoard | moveit</title>
      </Head>

      <MenuBar actualPage="leaderboard" />
      <div className={styles.leaderBoardContainer}>
        <h1>Leaderboard</h1>

        <table className={styles.leaderBoardTable}>
          <thead>
            <tr>
              <th>POSIÇÃO</th>
              <th>USUÁRIO</th>
              <th>DESAFIOS COMPLETOS</th>
              <th>EXPERIÊNCIA</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, userIndex) => (
              <UserTableCard
                key={user._id}
                position={userIndex}
                completedChallenges={user.completedChallenges}
                experience={user.experience}
                nameProps={user.name}
                avatarUrlProps={user.avatarUrl}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
