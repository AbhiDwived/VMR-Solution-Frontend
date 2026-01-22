import { useAppSelector, useAppDispatch } from '@/lib/hooks/redux'
import { setCredentials, logout, setLoading } from '@/store/slices/auth'

export const useAuth = () => {
  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const login = (user: any, token: string) => {
    dispatch(setCredentials({ user, token }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const setAuthLoading = (loading: boolean) => {
    dispatch(setLoading(loading))
  }

  return {
    ...auth,
    login,
    logout: handleLogout,
    setLoading: setAuthLoading,
  }
}