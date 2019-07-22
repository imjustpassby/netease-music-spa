const getters = {
  account: state => state.user.account,
  profile: state => state.user.profile,
  bindings: state => state.user.bindings,
  uid: state => state.user.uid,
  nickname: state => state.user.nickname,
  avatarUrl: state => state.user.avatarUrl,
  loginSuccess: state => state.user.loginSuccess
}

export default getters