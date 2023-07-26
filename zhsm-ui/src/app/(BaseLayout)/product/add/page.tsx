/**
 * <p>
 * 添加商品
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2023-07-19 16:54
 */
'use client'
import MainContent from '#/components/MainContent'
import type { FC } from 'react'

import { BaseInfoForm } from './components/form/BaseInfoForm'
import LayoutSpace from '#/components/LayoutSpace'
import { PriceForm } from './components/form/PriceForm'
import { InventoryForm } from './components/form/InventoryForm'
import { InventoryAlertForm } from './components/form/InventoryAlertForm'
import { FooterAction } from './components/FooterAction'
import { Form } from 'antd'

const ProductAddPage: FC = () => {
  const [form] = Form.useForm()

  const saveAndAdd = () => {
    console.log(form.getFieldsValue())
  }

  return (
    <>
      <MainContent title={'基本信息'}>
        <BaseInfoForm form={form} />
      </MainContent>

      <LayoutSpace direction={'vertical'} />

      <MainContent title={'价格管理'}>
        <PriceForm form={form} />
      </MainContent>

      <LayoutSpace direction={'vertical'} />

      <MainContent title={'期初库存'}>
        <InventoryForm />
      </MainContent>

      <LayoutSpace direction={'vertical'} />

      <MainContent title={'库存预警'}>
        <InventoryAlertForm />
      </MainContent>

      <LayoutSpace direction={'vertical'} />

      <MainContent
        style={{
          position: 'sticky',
          bottom: 0,
        }}
        size={'small'}
      >
        <FooterAction saveAndAdd={saveAndAdd} />
      </MainContent>
    </>
  )
}

export default ProductAddPage
