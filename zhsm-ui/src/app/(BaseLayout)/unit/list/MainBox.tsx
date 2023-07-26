/**
 * <p>
 *
 * </p>
 * @author Clover
 * @date 2023-07-25 09:52
 */
'use client'
import { useEffect, type FC, type PropsWithChildren, useState } from 'react'

import { ActionBar } from '#/app/(BaseLayout)/unit/list/components/ActionBar'
import MainContent from '#/components/MainContent'
import { fetchUnitListAsPage } from '#/api/unit'
import LayoutSpace from '#/components/LayoutSpace'
import { UnitList } from './components/UnitList'
import { useMessage } from '#/hooks/antd/useMessage'
import { TablePaginationConfig } from 'antd'

export const MainBox: FC<PropsWithChildren> = () => {
  const [queryWrapper, setQueryWrapper] = useState<API.UnitPageRequest>({
    unitName: '',
  })
  const [loading, setLoadState] = useState(false)
  const messageApi = useMessage()
  const [dataList, setDataList] = useState<API.UnitPageResponse[]>()
  const [pageConfig, setPageConfig] = useState<TablePaginationConfig>({
    size: 'small',
  })

  const fetchList = async () => {
    try {
      setLoadState(true)
      const {
        data: { code, message, data },
      } = await fetchUnitListAsPage(queryWrapper)

      if (code != 200) return messageApi?.error?.(message)

      setDataList(data.list)
      console.log(data)

      setPageConfig({
        ...pageConfig,
        pageSize: data.pageSize,
        total: data.total,
        current: data.currentPage,
      })
    } finally {
      setLoadState(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
      <MainContent>
        <ActionBar
          onSearch={fetchList}
          finish={fetchList}
          unitNameChange={(val) => setQueryWrapper({ ...queryWrapper, unitName: val })}
        />
      </MainContent>

      <LayoutSpace direction={'vertical'} />

      <MainContent>
        <UnitList
          data={dataList}
          loading={loading}
          pageConfig={pageConfig}
        />
      </MainContent>
    </>
  )
}
