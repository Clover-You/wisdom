/**
 * <p>
 * axios 二次封装
 * </p>
 * @author Clover
 * @date 2023-07-08 01:29
 */
import axios from 'axios'
import store from '../../redux/store'

const http = axios.create({})

http.interceptors.request.use(async (config) => {
  const user = store.getState().user
  user.token != void 0 &&
    (config.headers.Authorization = `Bearer ${user.token}`)
  return config
})

export default http
