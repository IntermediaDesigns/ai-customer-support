import { useTranslation } from 'react-i18next'
import { FooterBase } from './FooterBase'

export const Footer = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer')
  return (
    <FooterBase t={t} lng={lng} />
  )
}