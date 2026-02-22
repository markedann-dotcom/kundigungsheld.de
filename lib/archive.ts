export type ArchivStatus = "erstellt" | "gesendet" | "bestaetigt" | "abgelehnt" | "archiviert"

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
  status: ArchivStatus
  notiz: string
  /** ISO timestamp of last modification */
  updatedAt?: string
  /** ISO timestamp of creation */
  createdAt?: string
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const STORAGE_KEY = "kundigungsheld_archiv"
const SCHEMA_VERSION = 1

interface ArchivStorage {
  version: number
  items: ArchivedKundigung[]
}

function migrateItems(raw: unknown[]): ArchivedKundigung[] {
  const seen = new Set<string>()

  return raw.reduce<ArchivedKundigung[]>((acc, item, index) => {
    if (!item || typeof item !== "object") return acc
    const i = item as Record<string, unknown>

    let id = typeof i.id === "string" && i.id.length > 0
      ? i.id
      : `kh_${Date.now()}_${index}`

    if (seen.has(id)) {
      id = `${id}_${Date.now()}_${index}`
    }
    seen.add(id)

    acc.push({
      ...(item as ArchivedKundigung),
      id,
      status: (i.status as ArchivStatus) ?? "erstellt",
      notiz: typeof i.notiz === "string" ? i.notiz : "",
      createdAt: typeof i.createdAt === "string" ? i.createdAt : (typeof i.datum === "string" ? i.datum : new Date().toISOString()),
      updatedAt: typeof i.updatedAt === "string" ? i.updatedAt : (typeof i.datum === "string" ? i.datum : new Date().toISOString()),
    })
    return acc
  }, [])
}

function readStorage(): ArchivStorage {
  if (typeof window === "undefined") return { version: SCHEMA_VERSION, items: [] }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { version: SCHEMA_VERSION, items: [] }

    const parsed = JSON.parse(raw)

    if (Array.isArray(parsed)) {
      return { version: SCHEMA_VERSION, items: migrateItems(parsed) }
    }

    if (parsed?.items && Array.isArray(parsed.items)) {
      return { version: SCHEMA_VERSION, items: migrateItems(parsed.items) }
    }

    return { version: SCHEMA_VERSION, items: [] }
  } catch {
    return { version: SCHEMA_VERSION, items: [] }
  }
}

function writeStorage(items: ArchivedKundigung[]): void {
  const storage: ArchivStorage = { version: SCHEMA_VERSION, items }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns all archived Kündigungen, newest first. */
export function getArchiv(): ArchivedKundigung[] {
  return readStorage().items
}

/** Adds a new item to the top of the archive. Auto-generates id if missing. */
export function saveToArchiv(item: ArchivedKundigung): void {
  if (!item || typeof item !== "object") return

  const now = new Date().toISOString()
  const archiv = getArchiv()

  // Auto-generate id if missing or empty
  const id =
    typeof item.id === "string" && item.id.length > 0
      ? item.id
      : `kh_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`

  // Skip duplicates silently
  if (archiv.some((i) => i.id === id)) return

  writeStorage([
    {
      ...item,
      id,
      status: item.status ?? "erstellt",
      notiz: item.notiz ?? "",
      createdAt: item.createdAt ?? now,
      updatedAt: now,
    },
    ...archiv,
  ])
}

/** Updates specific fields of an existing item. Returns false if not found. */
export function updateArchivItem(
  id: string,
  updates: Partial<Omit<ArchivedKundigung, "id" | "createdAt">>
): boolean {
  const archiv = getArchiv()
  const index = archiv.findIndex((item) => item.id === id)

  if (index === -1) return false

  archiv[index] = {
    ...archiv[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  }

  writeStorage(archiv)
  return true
}

/** Deletes an item by ID. Returns false if not found. */
export function deleteArchivItem(id: string): boolean {
  const archiv = getArchiv()
  const filtered = archiv.filter((item) => item.id !== id)

  if (filtered.length === archiv.length) return false

  writeStorage(filtered)
  return true
}

/** Updates the status of an item. Shorthand for updateArchivItem. */
export function updateStatus(id: string, status: ArchivStatus): boolean {
  return updateArchivItem(id, { status })
}

/** Returns a single item by ID, or undefined if not found. */
export function getArchivItem(id: string): ArchivedKundigung | undefined {
  return getArchiv().find((item) => item.id === id)
}

/** Returns items filtered by status. */
export function getArchivByStatus(status: ArchivStatus): ArchivedKundigung[] {
  return getArchiv().filter((item) => item.status === status)
}

/** Returns a summary count grouped by status. */
export function getArchivStats(): Record<ArchivStatus, number> {
  const base: Record<ArchivStatus, number> = {
    erstellt: 0,
    gesendet: 0,
    bestaetigt: 0,
    abgelehnt: 0,
    archiviert: 0,
  }
  return getArchiv().reduce((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1
    return acc
  }, base)
}

/** Clears the entire archive. Use with caution. */
export function clearArchiv(): void {
  writeStorage([])
}

/** Exports the archive as a JSON string (for download/backup). */
export function exportArchiv(): string {
  return JSON.stringify({ version: SCHEMA_VERSION, items: getArchiv() }, null, 2)
}

/** Imports items from a JSON backup string. Merges with existing items, skips duplicates. */
export function importArchiv(json: string): { imported: number; skipped: number } {
  let parsed: unknown

  try {
    parsed = JSON.parse(json)
  } catch {
    throw new Error("Ungültiges JSON-Format.")
  }

  const rawItems: unknown[] = Array.isArray(parsed)
    ? parsed
    : Array.isArray((parsed as any)?.items)
    ? (parsed as any).items
    : []

  const newItems = migrateItems(rawItems)
  const existing = getArchiv()
  const existingIds = new Set(existing.map((i) => i.id))

  let imported = 0
  let skipped = 0

  const merged = [...existing]
  for (const item of newItems) {
    if (existingIds.has(item.id)) {
      skipped++
    } else {
      merged.push(item)
      imported++
    }
  }

  writeStorage(merged)
  return { imported, skipped }
}