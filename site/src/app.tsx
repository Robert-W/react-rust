import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { defaultAppState } from './config';
import Body from './components/Body';
import store from './store';

import './app.scss';

/**
 * @function App
 * @description Root application component
 */
export default function App() {
  // Setup our default state
  let [state, setState] = useState(defaultAppState);

  // Use this hook to run on mount and unmount only
  useEffect(() => {
    // Subscribe to state changes
    let unsubscribe = store.subscribe(() => setState(store.getState()));

    // Unsubscribe before unmount
    return unsubscribe;
  }, []);

  return (
    <ChakraProvider>
      <header className="header">Default Settings</header>
      <Body {...state} />
      <footer className="footer">Default Settings</footer>
    </ChakraProvider>
  );
}
