global.VITE_VIDEO_PATH = 'http://192.168.15.99:3002/public/videos';

// Configuração do ts-node
require('ts-node').register({
  transpileOnly: true,
  typeCheck: false,
  compilerOptions: {
    module: 'CommonJS',
    target: 'ESNext'
  },
});

// Importa o extend-expect do testing-library
require('@testing-library/jest-dom/extend-expect');
