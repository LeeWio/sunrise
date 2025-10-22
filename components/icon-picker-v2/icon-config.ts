import {
  JavaIcon,
  PythonIcon,
  ReactIcon,
  RustIcon,
  SwiftIcon,
} from '@/components/icons'

// 修复 NodejsIcon 导入问题，使用正确的导入路径
import { NodejsIcon } from '@/components/icons'

import { IconCategory, IconMeta } from './type'

export const icons: IconMeta[] = [
  {
    id: 'nodejs',
    name: 'Node.js',
    category: IconCategory.Coding,
    component: NodejsIcon,
    keywords: ['code', 'nodejs'],
  },
  {
    id: 'python',
    name: 'Python',
    category: IconCategory.Coding,
    component: PythonIcon,
    keywords: ['code', 'python'],
  },
  {
    id: 'java',
    name: 'Java',
    category: IconCategory.Coding,
    component: JavaIcon,
    keywords: ['code', 'java'],
  },
  {
    id: 'react',
    name: 'React',
    category: IconCategory.Coding,
    component: ReactIcon,
    keywords: ['code', 'react'],
  },
  {
    id: 'rust',
    name: 'Rust',
    category: IconCategory.Coding,
    component: RustIcon,
    keywords: ['code', 'rust'],
  },
  {
    id: 'swift',
    name: 'Swift',
    category: IconCategory.Coding,
    component: SwiftIcon,
    keywords: ['code', 'swift'],
  },
]