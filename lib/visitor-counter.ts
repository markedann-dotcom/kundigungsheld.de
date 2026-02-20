const VISITOR_KEY = "kh_visitor_count"
const VISITOR_SESSION_KEY = "kh_visitor_session"
const INITIAL_COUNT = 98547 // Стартовое значение для реалистичности

function getVisitorCount(): number {
  if (typeof window === "undefined") return INITIAL_COUNT
  try {
    const stored = localStorage.getItem(VISITOR_KEY)
    return stored ? parseInt(stored, 10) : INITIAL_COUNT
  } catch {
    return INITIAL_COUNT
  }
}

function incrementVisitor(): number {
  if (typeof window === "undefined") return INITIAL_COUNT
  try {
    const alreadyCounted = sessionStorage.getItem(VISITOR_SESSION_KEY)
    let count = getVisitorCount()
    
    if (!alreadyCounted) {
      // Добавляем +1 к счетчику при первом посещении в сессии
      count = count + 1
      localStorage.setItem(VISITOR_KEY, count.toString())
      sessionStorage.setItem(VISITOR_SESSION_KEY, "1")
      
      // Отправляем реальный визит на сервер (если API доступен)
      if (navigator.sendBeacon) {
        try {
          navigator.sendBeacon('/api/track-visitor', JSON.stringify({ 
            timestamp: Date.now(),
            path: window.location.pathname 
          }))
        } catch (e) {
          // Fallback: используем fetch
          fetch('/api/track-visitor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              timestamp: Date.now(),
              path: window.location.pathname 
            })
          }).catch(() => {
            // Игнорируем ошибки трекинга
          })
        }
      }
    }
    
    return count
  } catch {
    return INITIAL_COUNT
  }
}

// Функция для получения счетчика с сервера (опционально)
async function syncVisitorCount(): Promise<number | null> {
  try {
    const response = await fetch('/api/visitor-count', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    
    if (response.ok) {
      const data = await response.json()
      const serverCount = data.count || INITIAL_COUNT
      
      // Обновляем локальный счетчик, если серверный больше
      const localCount = getVisitorCount()
      if (serverCount > localCount) {
        localStorage.setItem(VISITOR_KEY, serverCount.toString())
        return serverCount
      }
    }
  } catch (e) {
    // Если API недоступен, используем локальный счетчик
    console.debug('Visitor API unavailable, using local count')
  }
  
  return null
}
