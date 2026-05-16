const stored = []
for (let i = 1; i <= 25; i += 1) {
  stored.push({
    id: i,
    teacherId: 2,
    title: `Subject material ${i}`,
    subject: ['Math', 'Science', 'English', 'History'][i % 4],
    description: `Detailed summary for content item ${i}.`,
    status: ['pending', 'approved', 'rejected'][i % 3],
    startTime: new Date(Date.now() - 3600 * 1000).toISOString(),
    endTime: new Date(Date.now() + 3600 * 1000 * (i % 4 + 1)).toISOString(),
    rotationDuration: 30,
    rejectionReason: i % 3 === 2 ? 'Missing attachments' : '',
    previewUrl: null
  })
}

const contentService = {
  async upload(formData) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    const newContent = {
      id: stored.length + 1,
      teacherId: 2,
      title: formData.title,
      subject: formData.subject,
      description: formData.description,
      status: 'pending',
      startTime: formData.startTime,
      endTime: formData.endTime,
      rotationDuration: formData.rotationDuration,
      rejectionReason: '',
      previewUrl: formData.previewUrl || null
    }
    stored.unshift(newContent)
    return { data: newContent }
  },
  async list({ status, search } = {}) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    let items = [...stored]
    if (status) items = items.filter((item) => item.status === status)
    if (search) items = items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    return { data: items }
  },
  async listByTeacher(teacherId) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { data: stored.filter((item) => item.teacherId === teacherId) }
  },
  async getActiveByTeacher(teacherId) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const now = new Date()
    const active = stored.find((item) => item.teacherId === Number(teacherId) && new Date(item.startTime) <= now && new Date(item.endTime) >= now && item.status === 'approved')
    return { data: active || null }
  }
}

export default contentService
