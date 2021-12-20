import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import WalletContext from './utils/WalletContext';
import { Suspense, lazy } from 'react';

const CardanoWalletConnect = lazy(async () => import('./components/CardanoWalletConnect'));

function ConnectWallet() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CardanoWalletConnect />
      </Suspense>
      
    </div>
  );
}


function App() {
  const [state, setState] = useState({
    walletApi: null,
    update
  })

  function update(data: any) {
    setState(Object.assign({}, state, data));
  }

  return (
    <WalletContext.Provider value={state}>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header> */}
        <ConnectWallet />
      </div>
    </WalletContext.Provider>
  );
}

export default App;
