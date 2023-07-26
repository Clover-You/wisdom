/**
 * <p>
 *
 * </p>
 * @author Clover
 * @date 2023-07-25 09:52
 */
'use client'
import type { FC, PropsWithChildren } from 'react'
import { AddUnitDrawer } from '#/app/(BaseLayout)/unit/list/components/AddUnitDrawer'
import MainContent from '#/components/MainContent'
import { ActionBar } from '#/app/(BaseLayout)/unit/list/components/ActionBar'

export const MainBox: FC<PropsWithChildren> = () => {
  const openAddUnitDrawer = () => {
    console.log('1')
  }
  return (
    <>
      <MainContent>
        <ActionBar openAddUnitDrawer={openAddUnitDrawer} />
      </MainContent>
    </>
  )
}
