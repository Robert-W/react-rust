export interface UserData {
  roles: string[];
}

export interface User {
  status: string;
  error?: string;
  data?: UserData;
}

export interface AppState {
  readonly user: User;
}

// Default application state
export const defaultAppState: AppState = {
  user: {
    status: 'INCOMPLETE',
    error: undefined,
    data: {
      roles: [],
    },
  },
};
