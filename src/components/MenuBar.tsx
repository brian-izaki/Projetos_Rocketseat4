import Link from 'next/link';
import styles from '../styles/components/MenuBar.module.css';

interface MenuBarProps {
  actualPage: 'home'|'leaderboard';
}

export function MenuBar({ actualPage }: MenuBarProps): JSX.Element {
  return (
    <nav className={styles.menuBarContainer}>

      <div>
        <img src="/logo-simple.svg" alt="logo do moveit" />
      </div>

      <section>

        <Link href="/">
          {actualPage === 'home'
            ? (
              <span className={styles.activePage}>
                <img src="/icons/homeSelected.svg" alt="Home da página" />
              </span>

            )
            : (
              <span>
                <img src="/icons/home.svg" alt="Home da página" />
              </span>
            )}
        </Link>

        <Link href="/leaderboard">
          {actualPage === 'leaderboard'
            ? (
              <span className={styles.activePage}>
                <img src="/icons/awardSelected.svg" alt="Home da página" />
              </span>
            )
            : (
              <span>
                <img src="/icons/award.svg" alt="Home da página" />
              </span>
            )}
        </Link>

      </section>

      <div />

    </nav>
  );
}
