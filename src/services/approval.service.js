import contentService from './content.service'

const approvalService = {
  async approve(contentId) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const result = await contentService.list()
    const item = result.data.find((content) => content.id === contentId)
    if (item) {
      item.status = 'approved'
      item.rejectionReason = ''
    }
    return { data: item }
  },
  async reject(contentId, reason) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const result = await contentService.list()
    const item = result.data.find((content) => content.id === contentId)
    if (item) {
      item.status = 'rejected'
      item.rejectionReason = reason
    }
    return { data: item }
  }
}

export default approvalService
