import Head from 'next/head';
import { MenuBar } from '../../components/MenuBar';
import { Profile } from '../../components/Profile';
import styles from '../../styles/pages/LeaderBoard.module.css';

interface UserCardTable {
  position: number;
  completedChallenges: number;
  experience: number;
}

const UserTableCard: React.FC<UserCardTable> = ({
  position,
  completedChallenges,
  experience,
}: UserCardTable) => (
  <tr>
    <td>{position}</td>

    <td>
      <div>
        <Profile />
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
            <UserTableCard position={1} completedChallenges={123} experience={12345} />
          </tbody>
        </table>
      </div>
    </>
  );
}
