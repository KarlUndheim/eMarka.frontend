module.exports = {
    async rewrites() {
        return [
          {
            source: '/:path*',
            destination: 'http://localhost:1337/:path*',
          },
        ]
      },
  };