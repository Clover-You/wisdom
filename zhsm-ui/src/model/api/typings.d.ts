/**
 * <p>
 * API 相关类型
 * </p>
 * @author Clover
 * @date 2023-06-30 17:57
 */

type RD<T> = T extends undefined ? {} : {
  /** 接口请求响应数据*/
  data: T
}
declare namespace API {

  /** 统一响应结构体 */
  type R<T = undefined> = Readonly<{
    /** 业务响应状态码 */
    code: number
    /** 业务响应消息 */
    message: string
  } & RD<T>>

  /**登录参数*/
  type UserMobilePhoneLoginRequest = {
    /** 手机号*/
    phone?: string
    /** 验证码 */
    verifyCode?: string
  }
}