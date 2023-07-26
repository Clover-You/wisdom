/**
 * <p>
 * 商品单位接口类型管理
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2023-07-26 14:47
 */
declare namespace API {
  /**
   * AddUnitRequest，添加单位
   */
  type AddUnitRequest = {
    /**
     * 启用状态 0=禁用；1=启用
     */
    enable?: number
    /**
     * 是否允许小数 0=不支持；1=支持
     */
    isDecimal?: number
    /**
     * 单位名称
     */
    unitName: string
    /**
     * 备注
     */
    unitRemark?: string
  }
}
