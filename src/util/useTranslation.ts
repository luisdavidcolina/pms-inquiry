import common from './common.json'

const getTranslation = (defaultNs: string) => {
  const translation = defaultNs === 'common' ? common : {}
  return translation
}

const useTranslation = (defaultNs: string) => {
  const translation = getTranslation(defaultNs)
  const t = (key: string) => translation[key as keyof typeof translation] || key
  return { t }
}

export default useTranslation
