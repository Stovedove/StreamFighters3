const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const { MNEMONIC, AVAX_MAINNET_URL, AVAX_TESTNET_URL } = process.env;

module.exports = {
  networks: {
    // Red de Desarrollo Local (Ganache)
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Coincide con cualquier ID de red
    },
    
    // Red de Prueba Avalanche Fuji
    fuji: {
      provider: () => new HDWalletProvider(MNEMONIC, AVAX_TESTNET_URL),
      network_id: 43113,       // ID de red de Fuji
      gas: 3000000,            // Gas límite
      gasPrice: 225000000000,  // Gas Price en wei (225 gwei)
      confirmations: 2,        // Confirmaciones después del despliegue
      timeoutBlocks: 200,      // Número de bloques antes de que se agote el tiempo
      skipDryRun: true,        // Saltar prueba previa
    },

    // Red Principal Avalanche C-Chain
    mainnet: {
      provider: () => new HDWalletProvider(MNEMONIC, AVAX_MAINNET_URL),
      network_id: 43114,       // ID de red de Mainnet
      gas: 8000000,            // Gas límite
      gasPrice: 225000000000,  // Gas Price en wei (225 gwei)
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  // Configuración del Compilador Solidity
  compilers: {
    solc: {
      version: "0.8.18",    // Especifica la versión de Solidity
      settings: {          // Ajustes adicionales del compilador
        optimizer: {
          enabled: true,
          runs: 200
        },
      },
    },
  },

  // Plugins y Claves API (opcional para verificación en exploradores)
  plugins: [
    'truffle-plugin-verify'
  ],

  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY, // Reemplaza con tu clave API de Etherscan si es necesario
  }
};
