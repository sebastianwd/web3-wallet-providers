import styled from 'styled-components'
import Metamask from 'public/icons/metamask.svg'
import Binance from 'public/icons/binance-wallet.svg'
import TrustWallet from 'public/icons/trustwallet.svg'

const Button = styled.button`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  margin: 0 auto;
  padding: 16px 24px;
  width: 100%;

  > svg {
    height: 48px;
  }

  :hover {
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
  }
`

const wallets = {
  metamask: {
    name: 'MetaMask',
    icon: <Metamask />,
  },
  bsc: {
    name: 'Binance Wallet',
    icon: <Binance />,
  },
  tw: {
    name: 'Trust Wallet',
    icon: <TrustWallet />,
  },
} as const

interface Props {
  onClick: () => void
  type: keyof typeof wallets
}

export const WalletIconButton = (props: Props) => {
  const { onClick, type } = props

  return (
    <Button onClick={onClick}>
      {wallets[type].icon}
      <p>{wallets[type].name}</p>
    </Button>
  )
}
