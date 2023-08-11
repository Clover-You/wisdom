/**
 * <p>
 * 手机号注册
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2023-08-11 09:48
 */
import { LockOutlined, SecurityScanOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, CardProps, Form, Input, theme } from 'antd'

import { useMessage } from '#/hooks/antd/useMessage'

export default function MobileRegisterBox() {
  const {
    token: { boxShadowSecondary, colorTextPlaceholder },
  } = theme.useToken()
  const messageApi = useMessage()

  const cardProps: CardProps = {
    title: '注册',
    style: {
      width: 500,
      transform: 'translate(-50%, -50%)',
      top: '50%',
      left: '50%',
      boxShadow: boxShadowSecondary,
    },
  }

  const SendBtnAddon = () => {
    return (
      <Button
        type={'link'}
        style={{ padding: 0, height: 'auto' }}
      >
        发送验证码
      </Button>
    )
  }

  return (
    <Card {...cardProps}>
      <Form>
        <Form.Item>
          <Input
            placeholder={'请输入手机号'}
            prefix={<UserOutlined style={{ color: colorTextPlaceholder }} />}
          />
        </Form.Item>

        <Form.Item>
          <Input
            placeholder={'请输入验证码'}
            prefix={<SecurityScanOutlined style={{ color: colorTextPlaceholder }} />}
            suffix={<SendBtnAddon />}
          />
        </Form.Item>

        <Form.Item>
          <Input
            placeholder={'请输入6~20位非空格字符'}
            prefix={<LockOutlined style={{ color: colorTextPlaceholder }} />}
          />
        </Form.Item>

        <Button
          block
          type={'primary'}
          htmlType={'submit'}
        >
          注册
        </Button>
      </Form>
    </Card>
  )
}
