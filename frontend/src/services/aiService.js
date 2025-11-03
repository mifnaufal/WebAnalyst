import api from './api'

export const getRecommendations = async (requestData) => {
  const response = await api.post('/ai-recommend', requestData)
  return response.data.recommendations
}