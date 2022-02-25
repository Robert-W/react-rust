import loggerMiddleware from './middleware/dev.logger.middleware';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { userReducers } from './user/user.slice';

const middleware: Array<Middleware> = [];

// This logger is ideal for development, but not for production
// It will log all actions and state updates to the console
if (process.env.NODE_ENV !== 'production') {
  middleware.push(loggerMiddleware);
}

let store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  reducer: {
    user: userReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
