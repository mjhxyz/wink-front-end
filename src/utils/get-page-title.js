import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Wink管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
