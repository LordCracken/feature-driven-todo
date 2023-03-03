import path from 'path';

const resolvePath = (p: string) => path.resolve(__dirname, p);

export default {
  webpack: {
    alias: {
      '@shared': resolvePath('./src/shared'),
      '@features': resolvePath('./src/features')
    }
  },
};
