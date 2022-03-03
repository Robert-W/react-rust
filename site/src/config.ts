/**
  * This is our user model that contains all our user data
  * Fill this out as necesary
  */
export interface UserData {
  roles: string[];
}

/**
  * This is a generic type that represents an HTTP request
  */
export interface HttpRequest<T> {
  status: string;
  error?: string;
  data?: T;
}

export interface AppState {
  readonly user: HttpRequest<UserData>;
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
