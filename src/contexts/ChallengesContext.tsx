import {
  createContext, useState, ReactNode, useEffect, useContext,
} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { UserContext } from './UserContext';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge(): void;
  closeLevelUpModal(): void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

// o objeto passado no no createContext deve SEGUIR o formato da interface
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps): JSX.Element {
  const { login } = useContext(UserContext);

  const [level, setLevel] = useState(rest.level ?? 1);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0,
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0,
  );

  const experienceToNextLevel = ((level + 1) * 4) ** 2;

  useEffect(() => {
    Notification.requestPermission();

    const username = JSON.parse(sessionStorage.getItem('userSession')).login;

    axios.get(`/api/challenges?login=${username}`).then((success) => {
      const { data } = success;
      setLevel(data.level);
      setCurrentExperience(data.experience);
      setChallengesCompleted(data.completedChallenges);
    });
  }, []);

  // definição de cookies da aplicação
  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
    axios.put('/api/users', {
      login, level, experience: currentExperience, completedChallenges: challengesCompleted,
    });
  }, [level, currentExperience, challengesCompleted, login]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    const notification = () => new Notification('Novo Desafio ✨✨', {
      body: `Valendo ${challenge.amount}xp!`,
    });

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      notification();
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    // Provider é nativo do React
    // todos os elementos dentro do provider, terão acesso aos elementos do contexto do challenges
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
