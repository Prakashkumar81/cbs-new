import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import StudentLiveAccessPage from './pages/StudentLiveAccessPage'
import TeacherDashboard from './pages/TeacherDashboard'
import UploadContentPage from './pages/UploadContentPage'
import MyContentPage from './pages/MyContentPage'
import PrincipalDashboard from './pages/PrincipalDashboard'
import PendingApprovalPage from './pages/PendingApprovalPage'
import AllContentPage from './pages/AllContentPage'
import LivePage from './pages/LivePage'
import AdminDashboard from './pages/AdminDashboard'

function PrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/student-live" replace />} />
          <Route path="/student-live" element={<StudentLiveAccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/teacher/dashboard" element={<PrivateRoute allowedRoles={[ 'teacher' ]}><TeacherDashboard /></PrivateRoute>} />
          <Route path="/teacher/upload" element={<PrivateRoute allowedRoles={[ 'teacher' ]}><UploadContentPage /></PrivateRoute>} />
          <Route path="/teacher/my-content" element={<PrivateRoute allowedRoles={[ 'teacher' ]}><MyContentPage /></PrivateRoute>} />
          <Route path="/principal/dashboard" element={<PrivateRoute allowedRoles={[ 'principal' ]}><PrincipalDashboard /></PrivateRoute>} />
          <Route path="/principal/pending" element={<PrivateRoute allowedRoles={[ 'principal' ]}><PendingApprovalPage /></PrivateRoute>} />
          <Route path="/principal/all" element={<PrivateRoute allowedRoles={[ 'principal' ]}><AllContentPage /></PrivateRoute>} />
          <Route path="/live/:teacherId" element={<LivePage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<div className="rounded-3xl bg-slate-900/80 p-6 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.85)] border border-white/10 text-slate-100">Page not found</div>} />
        </Routes>
      </div>
    </div>
  )
}
