import i18n from 'i18n'
import path from 'path'

i18n.configure({
  locales: ['bn_BD', 'en_US'],
  defaultLocale: 'en_US',
  directory: path.join(__dirname, '..', 'locales'),
  objectNotation: true,
  queryParameter: 'lang',
  api: {
    __: 'translate',
    __n: 'translateN',
  },
})

export { i18n }
