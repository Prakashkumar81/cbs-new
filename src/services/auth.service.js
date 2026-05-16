const STORAGE_KEY = 'mockUsers'

let storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || [
  { id: 1, role: 'principal', email: 'principal@example.com', password: 'password', name: 'Principal User' },
  { id: 2, role: 'teacher', email: 'teacher@example.com', password: 'password', name: 'Teacher User' },
  { id: 3, role: 'teacher', email: 'teacher@gmail.com', password: 'password', name: 'Teacher Gmail' },
  { id: 4, role: 'admin', email: 'admin@gmail.com', password: 'password', name: 'Admin User' },
  { id: 5, role: 'student', email: 'student@gmail.com', password: 'password', name: 'Student User' }
]

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedUsers))
}

const authService = {
  async login({ email, password }) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const user = storedUsers.find((u) => u.email === email && u.password === password)
    if (user) {
      return {
        token: `${user.role}-token-${user.id}`,
        user: { id: user.id, role: user.role, email: user.email, name: user.name }
      }
    }
    return { error: 'Invalid credentials' }
  },

  async signUp({ name, email, password, role = 'student' }) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (storedUsers.find((u) => u.email === email)) {
      return { error: 'Email already registered' }
    }
    const id = storedUsers.length ? Math.max(...storedUsers.map((u) => u.id)) + 1 : 1
    const newUser = { id, name, email, password, role }
    storedUsers.push(newUser)
    save()
    return {
      token: `${role}-token-${id}`,
      user: { id, name, email, role }
    }
  }
}

export default authService
