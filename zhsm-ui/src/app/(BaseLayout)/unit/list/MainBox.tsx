/**
 * <p>
 *
 * </p>
 * @author Clover
 * @date 2023-07-25 09:52
 */
'use client'
import { useEffect, useState } from 'react'

import type { TablePaginationConfig } from 'antd'
import type { FC, PropsWithChildren } from 'react'

import { ActionBar } from '#/app/(BaseLayout)/unit/list/components/ActionBar'
import MainContent from '#/components/MainContent'
import { fetchUnitListAsPage } from '#/api/unit'
import LayoutSpace from '#/components/LayoutSpace'
import { UnitList } from './components/UnitList'
import { useMessage } from '#/hooks/antd/useMessage'
import { wait } from '#/utils'

export const MainBox: FC<PropsWithChildren> = () => {
  const [queryWrapper, setQueryWrapper] = useState<API.UnitPageRequest>({
    unitName: '',
  })
  const [loading, setLoadState] = useState(false)
  const messageApi = useMessage()
  const [dataList, setDataList] = useState<API.UnitPageResponse[]>()
  const [pageConfig, setPageConfig] = useState<TablePaginationConfig>({
    size: 'small',
    hideOnSinglePage: true,
    showQuickJumper: true,
    onChange(page, pageSize) {
      fetchList({
        ...queryWrapper,
        current: page,
        size: pageSize,
      })
    },
  })

  /**
   * 数据查询
   * @param params 查询参数
   */
  const fetchList = async (params: API.UnitPageRequest) => {
    if (loading) return

    try {
      setLoadState(true)
      await wait(300)
      const {
        data: { code, message, data },
      } = await fetchUnitListAsPage(params)

      if (code != 200) return messageApi?.error?.(message)

      setDataList(data.list)

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
    fetchList(queryWrapper)
  }, [])
  return (
    <>
      <MainContent>
        <ActionBar
          onSearch={() => fetchList(queryWrapper)}
          finish={() => fetchList(queryWrapper)}
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
