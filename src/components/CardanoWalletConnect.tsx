import { useState, useContext } from "react"
import WalletContext from '../utils/WalletContext'
import { Buffer } from 'buffer'
import Loader from '../utils/Loader'

const _Buffer = Buffer

export default function CardanoWalletConnect() {
    const [walletAddress, setWalletAddress] = useState('')
    const walletCtx = useContext(WalletContext)

    // useEffect(() => {
    //     const loadAsync = async () => {
    //     }
    //     loadAsync()
    // },[])
    
    const connectWallet = async (wallet = 'Nami') => {
        const win: any = window
        await Loader.load();
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
        console.log(address)
        setWalletAddress(address)
    }

    const addressToBech32 = async () => {
        if(walletCtx.walletApi) {
            const address = (await walletCtx.walletApi.getUsedAddresses())[0]
            return await Loader.Cardano.Address.from_bytes(_Buffer.from(address, 'hex')).to_bech32()
        }
    }

    return (
        <>
            <button onClick={() => connectWallet()}>Connect Nami</button>
            <button onClick={() => connectWallet('ccvault')}>Connect ccvault</button>
            {walletAddress}
        </>
    )
}