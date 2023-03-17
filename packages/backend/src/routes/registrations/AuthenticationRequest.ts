

export type AuthenticationRequest = {
  scope: 'openid',
  response_type: 'id_token',
  client_id: string,
  redirect_uri: string,
  login_hint: string,
  state?: string,
  response_mode: 'form_post',
  nonce: string,
  prompt: 'none'
}