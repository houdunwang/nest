export const config = () => {
  return {
    name: '后盾人',
    host: process.env.HOST,
    key: 'houdunren',
    isDev: process.env.APP_ENV == 'dev',
  }
}
