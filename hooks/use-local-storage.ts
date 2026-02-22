import { useState, useEffect, useRef } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const isClient = useRef(false)

  useEffect(() => {
    isClient.current = true
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.warn(`Error loading localStorage key "${key}":`, error)
    }
  }, [key])

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Используем setStoredValue с колбэком чтобы всегда иметь актуальный prev
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value
        // Сохраняем в localStorage сразу с актуальным значением
        if (isClient.current) {
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
          } catch (e) {
            console.warn(`Error saving localStorage key "${key}":`, e)
          }
        }
        return valueToStore
      })
    } catch (error) {
      console.warn(`Error saving localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, isClient.current] as const
}