export interface User {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isGuest: boolean;
}
