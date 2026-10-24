import { useContext } from 'react'
import { StudioContext } from '../context/studioState'

export const useStudio = () => {
  const context = useContext(StudioContext)
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider')
  }
  return context
}
