export interface Event {
  title: string;
  date: Date;
  location: string;
  description: string;
  thumbnail?: string;
  category: Category;
  time: string;
  $id: string;
  $createdAt: string;
}
export interface LocalEvent {
  title: string;
  date: Date;
  location: string;
  description: string;
  thumbnail: string | null;
  time: string;
  category: string;
  $id: string;
  $createdAt: string;
}
export interface Category {
  name: string;
  description: string | null;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}
