import ai from './'
export function login(loginForm: {
  account: string
  password: string
}): Return {
  const url = '/api/user/setCookie'
  const data = 'RK=I+xtZYQjXu; ptcz=0407573f7e50d2131dd9cd25d0d9c253e8a648f1bd7397a94c512205ce9b9dbd; pgv_pvid=3056100225; pgv_pvi=3438241792; pvid=8919257881; o_cookie=1833290014; fqm_pvqid=92306b6b-b68a-4fac-8d14-5f89adfdc890; ts_uid=8310021888; eas_sid=81L6Y4v9j9Q337R282c9F4d3m9; pac_uid=1_1833290014; tmeLoginType=2; euin=oKcioi-qoen57n**; ts_refer=cn.bing.com/; fqm_sessionid=cbac9a16-fd89-4fbd-873d-4349a34e9baf; pgv_info=ssid=s5386779200; ts_last=y.qq.com/; _qpsvr_localtk=0.928551240906093; login_type=1; qm_keyst=Q_H_L_5WU6xTR4TNHw3u6oiyzCK2MapR4_xh_-GaovSv_D_ZgZsXVOmWx8gkw; psrf_musickey_createtime=1665994490; psrf_qqunionid=4B11AE64C62F7F48848084FF500C2A23; qqmusic_key=Q_H_L_5WU6xTR4TNHw3u6oiyzCK2MapR4_xh_-GaovSv_D_ZgZsXVOmWx8gkw; psrf_qqopenid=7037677CFDEB5B5110D8D1E037197878; psrf_access_token_expiresAt=1673770489; qm_keyst=Q_H_L_5WU6xTR4TNHw3u6oiyzCK2MapR4_xh_-GaovSv_D_ZgZsXVOmWx8gkw; wxunionid=; wxopenid=; psrf_qqrefresh_token=84A0AF17407CC0C1B9626673C33EF205; uin=1833290014; psrf_qqaccess_token=4A098ADFC900280F62AF692DA3B32BC5; wxrefresh_token='
  return new Promise((resolve) => {
    setTimeout(() => {
      if (loginForm.account === '1833290014' && loginForm.password === '123456') {
        ai.post(url, { data }, { headers: { 'Content-Type': 'application/json' } })
          .then((res) => {
            resolve([res.errMsg, res])
          })
      }
      else {
        resolve(['账号或密码不正确', null])
      }
    }, 1500)
  })
}
/**
 * 设置cookie 调用接口会直接将cookie设置到游览器中
 * @param account 用户账号
 * @returns
 */
export function getCookie(account: string): Return {
  const url = '/api/user/getCookie'
  return new Promise((resolve) => {
    ai.get(url, { params: { id: account } })
      .then((res) => {
        resolve([res.errMsg, res.data || res.message])
      })
  })
}
/**
 * 刷新登录 更新cookie
 * @returns
 */
export function refresh(): Return {
  const url = '/api/user/refresh'
  return new Promise((resolve) => {
    ai.get(url)
      .then((res) => {
        resolve([res.errMsg, res.data || res.message])
      })
  })
}
/**
 * 获取用户信息
 * @param account 用户账号
 * @returns
 */
export function getUserDetail(account: string): Return {
  const url = '/api/user/detail'
  return new Promise((resolve) => {
    ai.get(url, { params: { id: account } })
      .then((res) => {
        resolve([res.errMsg, res.data])
      })
  })
}

