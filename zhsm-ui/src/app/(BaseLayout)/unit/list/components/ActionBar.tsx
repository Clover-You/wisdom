/**
 * <p>
 * 操作栏
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2023-07-20 13:33
 */
'use client'
import { Button, Col, Dropdown, Input, Row, Space, theme } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import type { FC } from 'react'
import { AddUnitDrawer } from '#/app/(BaseLayout)/unit/list/components/AddUnitDrawer'
import { useState } from 'react'

export const ActionBar: FC<{
  openAddUnitDrawer: () => void
}> = (props) => {
  const {
    token: { margin },
  } = theme.useToken()
  const [addDrawerOpen, setAddDrawerOpenState] = useState(false)

  const openAddUnitDrawer = () => {
    setAddDrawerOpenState(true)
  }

  return (
    <>
      <AddUnitDrawer
        open={addDrawerOpen}
        afterOpenChange={setAddDrawerOpenState}
      />

      <Row
        justify={'space-between'}
        gutter={[margin, margin]}
      >
        <Col>
          <Space>
            <Button
              type={'primary'}
              onClick={openAddUnitDrawer}
            >
              新增单位
            </Button>

            <Dropdown
              menu={{
                items: [
                  { label: '删除', key: 'Delete' },
                  { label: '启用', key: 'Enable' },
                  { label: '停用', key: 'Disable' },
                ],
              }}
            >
              <Button>
                批量操作
                <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        </Col>

        <Col flex={'0 0 300px'}>
          <Input.Search enterButton={<Button>搜索</Button>} />
        </Col>
      </Row>
    </>
  )
}
