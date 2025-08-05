import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/conversions/conversions-list',
    label: 'Conversions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiSwapHorizontal' in icon ? icon['mdiSwapHorizontal' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CONVERSIONS'
  },
  {
    href: '/documents/documents-list',
    label: 'Documents',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFileDocument' in icon ? icon['mdiFileDocument' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_DOCUMENTS'
  },
  {
    href: '/images/images-list',
    label: 'Images',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiImage' in icon ? icon['mdiImage' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_IMAGES'
  },
  {
    href: '/voice_interactions/voice_interactions-list',
    label: 'Voice interactions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiMicrophone' in icon ? icon['mdiMicrophone' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_VOICE_INTERACTIONS'
  },
  {
    href: '/organizations/organizations-list',
    label: 'Organizations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ORGANIZATIONS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
