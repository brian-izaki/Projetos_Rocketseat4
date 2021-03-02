import { createContext, ReactNode, useState } from 'react';

interface UserProps {
  children: ReactNode,
}

interface UserSession {
  login: string;
  name: string,
  avatarUrl: string,
}

interface UserContextProps extends UserSession {
  loggedUser(): void,
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: UserProps): JSX.Element {
  const [user, setUser] = useState({} as UserSession);

  function loggedUser() {
    const storagedUser = JSON.parse(sessionStorage.getItem('userSession'));
    console.log(storagedUser);
    setUser(storagedUser);
  }

  return (
    <UserContext.Provider
      value={{
        login: user.login,
        name: user.name,
        avatarUrl: user.avatarUrl,
        loggedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
