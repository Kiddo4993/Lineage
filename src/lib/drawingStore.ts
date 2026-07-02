import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export interface StoredFeedback {
  strengths: string[];
  improvements: string[];
  next: string;
}

export interface StoredDrawing {
  key: string;
  day?: number;
  category?: string;
  dataUrl: string;
  feedback?: StoredFeedback;
  createdAt: string;
}

interface LineageDB extends DBSchema {
  drawings: {
    key: string;
    value: StoredDrawing;
    indexes: { day: number };
  };
}

let dbPromise: Promise<IDBPDatabase<LineageDB>> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<LineageDB>("lineage-drawings", 1, {
      upgrade(db) {
        const store = db.createObjectStore("drawings", { keyPath: "key" });
        store.createIndex("day", "day");
      },
    });
  }
  return dbPromise;
}

export async function saveLessonDrawing(
  day: number,
  dataUrl: string,
  feedback?: StoredFeedback
): Promise<void> {
  const db = await getDB();
  await db.put("drawings", {
    key: `lesson-${day}`,
    day,
    dataUrl,
    feedback,
    createdAt: new Date().toISOString(),
  });
}

export async function saveCoachingDrawing(
  category: string,
  dataUrl: string,
  feedback?: StoredFeedback
): Promise<void> {
  const db = await getDB();
  const key = `coaching-${category}-${Date.now()}`;
  await db.put("drawings", {
    key,
    category,
    dataUrl,
    feedback,
    createdAt: new Date().toISOString(),
  });
}

export async function getLessonDrawing(day: number): Promise<StoredDrawing | undefined> {
  const db = await getDB();
  return db.get("drawings", `lesson-${day}`);
}

export async function getAllDrawings(): Promise<StoredDrawing[]> {
  const db = await getDB();
  const all = await db.getAll("drawings");
  return all.sort((a, b) => (a.day ?? 0) - (b.day ?? 0));
}
