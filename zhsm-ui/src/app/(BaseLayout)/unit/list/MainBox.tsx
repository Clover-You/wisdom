/**
 * <p>
 *
 * </p>
 * @author Clover
 * @date 2023-07-25 09:52
 */
'use client'
import { useEffect, type FC, type PropsWithChildren } from 'react'

import { ActionBar } from '#/app/(BaseLayout)/unit/list/components/ActionBar'
import MainContent from '#/components/MainContent'
import { fetchUnitListAsPage } from '#/api/unit'

export const MainBox: FC<PropsWithChildren> = () => {
  const fetchList = async () => {
    const {
      data: { code, message, data },
    } = await fetchUnitListAsPage()

    console.log(data)
  }

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
      <MainContent>
        <ActionBar finish={undefined} />
      </MainContent>
    </>
  )
}
