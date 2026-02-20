export interface ArchivedKundigung {
  id: string
  companyName: string
  companyCategory: string
  grund: string
  grundLabel: string
  vorname: string
  nachname: string
  datum: string
  kuendigungZum: string
  text: string
  status: "erstellt" | "gesendet" | "bestaetigt"
  notiz: string
}

const STORAGE_KEY = "kundigungsheld_archiv"

export function getArchiv(): ArchivedKundigung[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    
    const archiv = JSON.parse(data)
    
    // Migrate old items without status field and ensure unique IDs
    const seen = new Set<string>()
    return archiv
      .map((item: any, index: number) => {
        let id = item.id
        // If duplicate ID found, generate new unique one
        if (seen.has(id)) {
          id = `${id}_${Date.now()}_${index}`
        }
        seen.add(id)
        
        return {
          ...item,
          id,
          status: item.status || "erstellt", // Default to 'erstellt' if missing
        }
      })
  } catch {
    return []
  }
}

export function saveToArchiv(item: ArchivedKundigung): void {
  const archiv = getArchiv()
  archiv.unshift(item)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(archiv))
}

export function updateArchivItem(id: string, updates: Partial<ArchivedKundigung>): void {
  const archiv = getArchiv()
  const index = archiv.findIndex((item) => item.id === id)
  if (index !== -1) {
    archiv[index] = { ...archiv[index], ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(archiv))
  }
}

export function deleteArchivItem(id: string): void {
  const archiv = getArchiv().filter((item) => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(archiv))
}
