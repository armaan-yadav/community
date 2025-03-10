export interface Event {
  title: string;
  date: Date;
  description: string;
  location: string;
  tags: string[];
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
