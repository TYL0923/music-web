import ai from './'
export function login(loginForm: {
  account: string
  password: string
}): Return {
  const url = '/api/user/setCookie'
  const data = 'RK=I+xtZYQjXu; ptcz=0407573f7e50d2131dd9cd25d0d9c253e8a648f1bd7397a94c512205ce9b9dbd; pgv_pvid=3056100225; pgv_pvi=3438241792; pvid=8919257881; o_cookie=1833290014; fqm_pvqid=92306b6b-b68a-4fac-8d14-5f89adfdc890; ts_uid=8310021888; eas_sid=81L6Y4v9j9Q337R282c9F4d3m9; pac_uid=1_1833290014; luin=o1833290014; lskey=00010000a7eab95fa5668b09a08f467e2a8ea9a30d2868baa7645ce55b9cdfaced35a7b62afd0a5f4c7a4ab6; psrf_qqaccess_token=4A098ADFC900280F62AF692DA3B32BC5; wxrefresh_token=; wxunionid=; psrf_qqunionid=4B11AE64C62F7F48848084FF500C2A23; tmeLoginType=2; psrf_qqopenid=7037677CFDEB5B5110D8D1E037197878; psrf_qqrefresh_token=84A0AF17407CC0C1B9626673C33EF205; euin=oKcioi-qoen57n**; wxopenid=; fqm_sessionid=233cfa8b-261d-42ab-8f1e-3804024b2530; pgv_info=ssid=s1675509613; ts_refer=jsososo.github.io/; ts_last=y.qq.com/; _qpsvr_localtk=0.18370146430881196; login_type=1; qqmusic_key=Q_H_L_5mlOZu3x6y6PwX7tGFFRLGngGN4uwZp89OeyrjcSLKeYb8NUtCI-igg; psrf_musickey_createtime=1664984757; uin=1833290014; qm_keyst=Q_H_L_5mlOZu3x6y6PwX7tGFFRLGngGN4uwZp89OeyrjcSLKeYb8NUtCI-igg; psrf_access_token_expiresAt=1672760757; qm_keyst=Q_H_L_5mlOZu3x6y6PwX7tGFFRLGngGN4uwZp89OeyrjcSLKeYb8NUtCI-igg'
  return new Promise((resolve) => {
    setTimeout(() => {
      if (loginForm.account === 'tyl0923' && loginForm.password === '123456') {
        ai.post(url, { data }, { headers: { 'Content-Type': 'application/json' } })
          .then((res) => {
            resolve([res.errMsg, res.data])
          })
      }
      else {
        resolve(['账号或密码不正确', null])
      }
    }, 1500)
  })
}

export function getUserDetail(account: string): Return {
  const url = '/api/user/detail'
  return new Promise((resolve) => {
    ai.get(url, { params: { id: account } })
      .then((res) => {
        resolve([res.errMsg, res.data])
      })
  })
}
export function getCookie(account: string): Return {
  const url = '/api/user/getCookie'
  return new Promise((resolve) => {
    ai.get(url, { params: { id: account } })
      .then((res) => {
        resolve([res.errMsg, res.data || res.message])
      })
  })
}
