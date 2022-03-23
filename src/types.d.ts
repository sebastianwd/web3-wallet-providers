declare module '*.svg' {
  const value: any
  export default value
}
declare module '*.png' {
  const value: any
  export default value
}

interface Window {
  ethereum: import('web3-core').provider
}
