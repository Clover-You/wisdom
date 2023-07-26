/**
 * <p>
 * 商品分类
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2023-07-19 06:08
 */
import type { FC } from 'react'

import LayoutSpace from '#/components/LayoutSpace'
import MainContent from '#/components/MainContent'
import { TitleActionBar } from './TitleActionBar'
import { PageContextProvider } from './context'
import { CategoryTree } from './CategoryTree'

export const metadata = {
  title: '商品分类-智慧商贸',
}

const ClassSetting: FC = () => {
  return (
    <>
      <PageContextProvider>
        <MainContent>
          <TitleActionBar />
        </MainContent>

        <LayoutSpace direction={'vertical'} />

        <MainContent style={{ minHeight: 300 }}>
          <CategoryTree />
        </MainContent>
      </PageContextProvider>
    </>
  )
}

export default ClassSetting
