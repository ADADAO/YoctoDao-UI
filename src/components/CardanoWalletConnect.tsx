import { useState, useContext } from "react"
import WalletContext from '../utils/WalletContext'
import { Buffer } from 'buffer'
import Loader from '../utils/Loader'


const _Buffer = Buffer

export default function CardanoWalletConnect() {
    const [walletAddress, setWalletAddress] = useState('')
    const walletCtx = useContext(WalletContext)
    
    const connectWallet = async (wallet = 'Nami') => {
        const win: any = window
       
        let fullWalletApi = null
        switch(wallet) {
            case 'Nami':
                await win.cardano.enable()
                fullWalletApi = win.cardano
                break
            case 'ccvault':
                fullWalletApi = await win.cardano.ccvault.enable()
                break
            default:
                break
        }
        walletCtx.update({walletApi: fullWalletApi})
        let address =  await addressToBech32()
        setWalletAddress(address)
    }

    const addressToBech32 = async () => {
        await Loader.load();
        if(walletCtx.walletApi) {
            const address = (await walletCtx.walletApi.getUsedAddresses())[0]
            return await Loader.Cardano.Address.from_bytes(_Buffer.from(address, 'hex')).to_bech32()
        }
    }

    return (
        <>
            <button onClick={async () => await connectWallet()}>Connect Nami</button>
            <button onClick={async () => await connectWallet('ccvault')}>Connect ccvault</button>
            {walletAddress}
        </>
    )
}