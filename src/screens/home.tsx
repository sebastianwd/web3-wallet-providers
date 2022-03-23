import React from 'react'
import Web3 from 'web3'

const HomeScreen = () => {
  React.useEffect(() => {
    if (window.ethereum) {
      /* window.ethereum
            .request({
              method: 'eth_requestAccounts',
            })
            .then(console.log)*/

      const web3 = new Web3(window.ethereum)

      web3.eth.requestAccounts().then(console.log)
    }
  }, [])

  return <div>h</div>
}

export default HomeScreen
