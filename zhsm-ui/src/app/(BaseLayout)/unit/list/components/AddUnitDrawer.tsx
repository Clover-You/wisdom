/**
 * <p>
 * 新增单位抽屉
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2023-07-20 13:41
 */
'use client'
import { Button, Form, Input, Radio, Space } from 'antd'

import DrawerPro from '#/components/DrawerPro'
import { useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'

type UnitDrawerProps = {
  open?: boolean
  afterOpenChange?: (open: boolean) => void
}

export const AddUnitDrawer: FC<UnitDrawerProps> = (props) => {
  const [open, setOpenState] = useState(false)
  const [form] = Form.useForm()

  const FooterAction = useCallback(() => {
    return (
      <Space>
        <Button
          htmlType={'submit'}
          onClick={form.submit}
        >
          保存并新增
        </Button>
        <Button type={'primary'}>保存</Button>
        <Button onClick={() => setOpenState(false)}>取消</Button>
      </Space>
    )
  }, [form])

  const afterOpenChange = (drawerState: boolean) => {
    // 通知父组件抽屉状态已更改
    props.afterOpenChange?.(drawerState)
    form.resetFields()
  }

  useEffect(() => setOpenState(props.open ?? false), [props.open])

  return (
    <DrawerPro
      title={'新增单位'}
      width={700}
      open={open}
      footer={<FooterAction />}
      height={700}
      afterOpenChange={afterOpenChange}
    >
      <Form
        form={form}
        layout={'vertical'}
        onFinish={(data) => {
          console.log(data)
        }}
      >
        <Form.Item
          label={'单位名称'}
          name={'unitName'}
          rules={[{ required: true, message: '请输入单位名称' }]}
        >
          <Input placeholder={'请输入单位名称'} />
        </Form.Item>

        <Form.Item name={'isDecimal'}>
          <DecimalRadio />
        </Form.Item>

        <Form.Item
          label={'备注'}
          name={'remark'}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </DrawerPro>
  )
}

const DecimalRadio: FC<{
  value?: number
  onChange?: (value?: number) => void
}> = (props) => {
  const [value, setValue] = useState<number>()

  useEffect(() => {
    setValue(props.value)
  }, [props, props.value])

  return (
    <Space size={16}>
      <span>允许小数</span>

      <Radio.Group
        defaultValue={0}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          props.onChange?.(e.target.value)
        }}
      >
        <Radio value={0}>允许</Radio>
        <Radio value={1}>不允许</Radio>
      </Radio.Group>
    </Space>
  )
}
