module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    indent: [2, 'tab'],
    'no-tabs': 'off'
  }
}
