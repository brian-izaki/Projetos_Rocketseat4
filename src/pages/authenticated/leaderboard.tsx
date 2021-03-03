/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { MenuBar } from '../../components/MenuBar';
import { Profile } from '../../components/Profile';
import styles from '../../styles/pages/LeaderBoard.module.css';

interface UserCardTable {
  position: number;
  completedChallenges: number;
  experience: number;
  nameProps: string;
  avatarUrlProps: string;
  levelProps: number;
}

interface UserData {
  _id: number;
  login: string;
  name: string;
  avatarUrl: string;
  level: number;
  completedChallenges: number;
  experience: number;
  registeredAt: DateConstructor;
}

interface LeaderboardProps {
  userList: Array<UserData>;
}

const UserTableCard: React.FC<UserCardTable> = ({
  position,
  completedChallenges,
  experience,
  nameProps,
  avatarUrlProps,
  levelProps,
}: UserCardTable) => (
  <tr>
    <td>{position}</td>

    <td>
      <div>
        <Profile nameProp={nameProps} avatarUrlProp={avatarUrlProps} levelProp={levelProps} />
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

export default function LeaderBoard({ userList }: LeaderboardProps): JSX.Element {
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
            {userList.map((user, userIndex) => (
              <UserTableCard
                key={user.login}
                position={userIndex + 1}
                completedChallenges={user.completedChallenges}
                experience={user.experience}
                nameProps={user.name}
                avatarUrlProps={user.avatarUrl}
                levelProps={user.level}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userList = await axios.get(`http://${ctx.req.headers.host}/api/users`)
    .then((usersRes) => usersRes.data.users);

  return {
    props: {
      userList,
    },
  };
};
