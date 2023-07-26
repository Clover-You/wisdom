/**
 * <p>
 * 登录页面
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2023-06-20 00:24
 */
import dynamic from 'next/dynamic'

const LoginCard = dynamic(() => import('./LoginCard'), { ssr: false })

export const metadata = {
  title: '智慧商贸-登录',
}

function Login() {
  return (
    <main style={{ height: '100vh', background: 'url(/bg.svg)' }}>
      <LoginCard />
    </main>
  )
}

export default Login
