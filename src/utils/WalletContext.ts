import { createContext } from 'react';

interface ICardanoWalletContext {
    walletApi: any;
    update: (data: any) => void;
}

const defaultState = {
    walletApi: null,
    update: (data: any) => {}
};

const WalletContext = createContext<ICardanoWalletContext>(defaultState)

export default WalletContext