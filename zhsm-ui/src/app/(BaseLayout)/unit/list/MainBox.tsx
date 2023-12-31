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
import { useModal } from '#/hooks/antd/useModal'
import { EditUnitDrawer } from './components/EditUnitDrawer'

export const MainBox: FC<PropsWithChildren> = () => {
  const messageApi = useMessage()
  const modalApi = useModal()

  const [queryWrapper, setQueryWrapper] = useState<API.UnitPageRequest>({
    unitName: '',
  })
  const [loading, setLoadState] = useState(false)
  const [editDrawerOpen, setEditOpen] = useState(false)
  const [editCallbackData, setCallbackData] = useState<API.UnitPageResponse | undefined>(undefined)
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

  /**
   * 编辑当前行
   * @param record 但前行数据
   */
  const onRowEditClick = (record: API.UnitPageResponse) => {
    setCallbackData(record)
    setEditOpen(true)
  }

  /**
   * 移除当前行数据
   * @param record 当前行数据
   */
  const onRemoveRow = (record: API.UnitPageResponse) => {
    modalApi?.confirm?.({
      content: '确定要删除选中的单位吗?',
      onOk: async () => {
        messageApi?.success?.('删除成功')
      },
    })
  }

  useEffect(() => {
    fetchList(queryWrapper)
  }, [])
  return (
    <>
      <EditUnitDrawer
        onFinish={() => fetchList(queryWrapper)}
        open={editDrawerOpen}
        callbackData={editCallbackData}
        afterOpenChange={(open) => setEditOpen(open)}
      />

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
          onEdit={onRowEditClick}
          remove={onRemoveRow}
          data={dataList}
          loading={loading}
          pageConfig={pageConfig}
        />
      </MainContent>
    </>
  )
}
