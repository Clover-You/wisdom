/**
 * <p>
 * 发送登录验证码按钮
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2023-07-12 16:40
 */
import { Button, message } from 'antd'
import { useState, useRef } from 'react'

import type { ButtonProps } from 'antd'
import type { FC } from 'react'

import { sendLoginPhoneVerifyCode } from '#/api/login'

export type SendPhoneCodeButtonProps = Omit<
  ButtonProps,
  'onClick' | 'disabled'
> & {
  before: () => Promise<boolean>
  getPhone: () => Promise<string>
}

export const SendPhoneCodeButton: FC<SendPhoneCodeButtonProps> = (props) => {
  const [disableState, setDisable] = useState(false)
  const [loadState, setLoad] = useState(false)
  const [timing, setCountdown] = useState(60)

  /**
   * 发送登录验证码
   */
  const sendLoginVerifyCode = async () => {
    if (!(await props.before())) return

    try {
      setLoad(true)
      // 发送验证码
      const phone = await props.getPhone()
      const resp = await sendLoginPhoneVerifyCode(phone)

      // 处理响应状态
      const { code, message: codeMessage } = resp.data
      if (code != 200) return message.error(codeMessage)

      // 登录验证码发送成功，开启倒计时
      startCountdown()
    } catch (e) {
      console.error(e)
      message.error(`验证码发送失败，系统异常\,${e}`)
    } finally {
      setLoad(false)
    }
  }

  const timer = useRef<NodeJS.Timeout | undefined>(undefined)

  /**
   * 开启计时
   */
  const startCountdown = async () => {
    if (disableState) return
    setDisable(true)

    timer.current = setInterval(() => {
      setCountdown((timing) => {
        if (timing == 0) {
          timer.current != void 0 && clearInterval(timer.current)
          timer.current = undefined
          setDisable(false)
          return 60
        }

        return timing - 1
      })
    }, 1000)
  }

  return (
    <>
      <Button
        style={props.style}
        onClick={sendLoginVerifyCode}
        loading={loadState}
        disabled={disableState}
      >
        {disableState ? timing : '发送验证码'}
      </Button>
    </>
  )
}
