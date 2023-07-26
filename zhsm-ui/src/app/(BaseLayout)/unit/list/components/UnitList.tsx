/**
 * <p>
 * 单位列表展示
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2023-07-26 17:19
 */
'use client'
import { CSSProperties, FC, useState } from 'react'

import GridPro from '#/components/GridPro'
import { GridProAlignType, GridProColumns, GridProFixedType } from '#/components/GridPro/GridProType'
import { Button, Divider, Space, TablePaginationConfig } from 'antd'

export const UnitList: FC<{
  data?: API.UnitPageResponse[]
  loading?: boolean
  pageConfig?: TablePaginationConfig
}> = (props) => {
  const [columns] = useState<GridProColumns<API.UnitPageResponse>>([
    {
      title: '序号',
      field: 'sort',
      align: GridProAlignType.Center,
      fixed: GridProFixedType.Left,
      width: 60,
    },
    {
      title: '操作',
      align: GridProAlignType.Center,
      fixed: GridProFixedType.Left,
      width: 140,
      render: () => <GridOperation />,
    },
    {
      title: '单位名称',
      field: 'unitName',
      minWidth: 120,
    },
    {
      title: '允许小数',
      field: 'isDecimal',
      minWidth: 120,
      render: (value: number) => (value == 0 ? '不允许' : '允许'),
    },
    {
      title: '状态',
      field: 'enable',
      minWidth: 120,
      render: (value: number) => (value == 0 ? '停用' : '启用'),
    },
    {
      title: '状态',
      field: 'unitRemark',
      minWidth: 120,
    },
  ])

  return (
    <GridPro
      pagination={props.pageConfig}
      loading={{
        tip: '数据加载中',
        spinning: props.loading,
      }}
      columns={columns}
      data={props.data}
      rowKey={(row) => row.unitId!}
      height={400}
      rowSelection={{
        type: 'checkbox',
        fixed: true,
      }}
    />
  )
}

const GridOperation: FC = () => {
  const ButtonStyle: CSSProperties = { padding: 0, height: 'auto' }

  return (
    <Space
      size={0}
      split={<Divider type={'vertical'} />}
    >
      <Button
        type={'link'}
        style={ButtonStyle}
      >
        编辑
      </Button>
      <Button
        type={'link'}
        style={ButtonStyle}
      >
        删除
      </Button>
    </Space>
  )
}
