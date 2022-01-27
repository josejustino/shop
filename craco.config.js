module.exports = {
  jest: {
    configure(config) {
      config['collectCoverageFrom'] = [
        '<rootDir>/src/components/**/*.js',
        '<rootDir>/src/pages/**/*.js',
        '<rootDir>/src/hooks/**/*.js',
        '<rootDir>/src/store/**/*.js',
      ]

      config['testMatch'] = [
        '<rootDir>/src/**/*.+(spec|test).[jt]s?(x)',
      ]

      config['testPathIgnorePatterns'] = [
        '<rootDir>/public/', '<rootDir>/node_modules/'
      ]

      return config;
    }
  },
}
