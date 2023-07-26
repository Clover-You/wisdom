/**
 * <p>
 * 商品单位
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2023-07-26 14:47
 */
import http from '#/utils/request'
import service from '#/constant/service'

/**
 * 添加新单位
 * @param params 单位信息
 */
export const addNewUnit = (params: API.AddUnitRequest) => {
  return http.post<API.R>(service.unit.add_new_unit, params)
}

/**
 * 分页获取单位列表
 * @returns 单位列表
 */
export const fetchUnitListAsPage = () => {
  return http.get<API.R<[]>>(service.unit.fetch_page)
}
