// Генератор минималистичных монохромных логотипов для компаний
export function generateCompanyLogo(companyName: string, category: string): string {
  // Создаем детерминированный хеш из названия компании
  const hash = companyName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  
  // Монохромная палитра с разными оттенками серого
  const monochromeShades = [
    '#171717', // zinc-900
    '#262626', // zinc-800
    '#404040', // zinc-700
    '#525252', // zinc-600
    '#737373', // zinc-500
    '#18181B', // slate-900
    '#27272A', // slate-800
    '#3F3F46', // slate-700
  ]
  
  const shadeIndex = Math.abs(hash) % monochromeShades.length
  const bgColor = monochromeShades[shadeIndex]
  
  // Генерация инициалов (первые 2 буквы или 1 если короткое)
  const cleanName = companyName
    .replace(/[^\w\s]/g, '') // удаляем спецсимволы
    .trim()
  
  const words = cleanName.split(/[\s-]+/).filter(w => w.length > 0)
  let initials = ''
  
  if (words.length >= 2) {
    initials = (words[0][0] || '') + (words[1][0] || '')
  } else if (words.length === 1) {
    const word = words[0]
    initials = word.length >= 2 ? word.substring(0, 2) : word[0]
  } else {
    // Fallback если название странное
    initials = cleanName.substring(0, 2) || 'UN'
  }
  
  initials = initials.toUpperCase()
  
  // Минималистичные формы
  const shapes = ['circle', 'roundedSquare', 'rounded']
  const shapeIndex = Math.abs(hash >> 4) % shapes.length
  const shape = shapes[shapeIndex]
  
  // SVG логотип - чистый минималистичный стиль
  const svgShapes: Record<string, string> = {
    circle: `<circle cx="50" cy="50" r="46" fill="${bgColor}"/>`,
    roundedSquare: `<rect x="4" y="4" width="92" height="92" rx="18" fill="${bgColor}"/>`,
    rounded: `<rect x="8" y="8" width="84" height="84" rx="16" fill="${bgColor}"/>`,
  }
  
  // Очень тонкая тень для глубины (минимализм)
  const shadowDef = `
    <defs>
      <filter id="shadow-${Math.abs(hash)}" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
        <feOffset dx="0" dy="1" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.1"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  `
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      ${shadowDef}
      <g filter="url(#shadow-${Math.abs(hash)})">
        ${svgShapes[shape]}
      </g>
      <text 
        x="50" 
        y="50" 
        text-anchor="middle" 
        dominant-baseline="central" 
        font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif" 
        font-size="34" 
        font-weight="700" 
        fill="white"
        letter-spacing="-0.02em"
      >${initials}</text>
    </svg>
  `.trim()
  
  // Конвертируем в data URL
  const encoded = encodeURIComponent(svg)
  return `data:image/svg+xml,${encoded}`
}

// React компонент для отображения логотипа компании
export function CompanyLogo({ 
  name, 
  category, 
  size = 48,
  className = ''
}: { 
  name: string
  category: string
  size?: number
  className?: string
}) {
  const logoUrl = generateCompanyLogo(name, category)
  
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src={logoUrl} 
        alt={`${name} logo`}
        width={size}
        height={size}
        className="w-full h-full rounded-xl"
        style={{ width: size, height: size }}
        loading="lazy"
      />
    </div>
  )
}
