import api from './api'

export const sendRawRequest = async (rawRequest) => {
  const response = await api.post('/proxy', { raw_request: rawRequest })
  return response.data
}