import { databases } from "@/config/appwrite";
import { Category } from "@/types";
import { Databases, Query } from "appwrite";

class DbServices {
  private databaseId: string;
  private databases: Databases;
  private categoriesCollectionId: string;
  private eventsCollectionId: string;
  constructor() {
    this.databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    this.databases = databases;
    this.categoriesCollectionId =
      import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID;
    this.eventsCollectionId =
      import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;
  }

  async getAllEvents(): Promise<Event[]> {
    try {
      const response = await this.databases.listDocuments(
        this.databaseId,
        this.eventsCollectionId
      );
      return response.documents.map((doc) => doc as unknown as Event);
    } catch (error) {
      console.error("Error fetching lands:", error);
      throw error;
    }
  }
  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await this.databases.listDocuments(
        this.databaseId,
        this.categoriesCollectionId
      );
      return response.documents.map((doc) => doc as unknown as Category);
    } catch (error) {
      console.error("Error fetching lands:", error);
      throw error;
    }
  }
  async getAllEventsByCategory({
    category,
  }: {
    category: string;
  }): Promise<Category[]> {
    try {
      const response = await this.databases.listDocuments(
        this.databaseId,
        this.categoriesCollectionId,
        [Query.equal("category", category)]
      );
      return response.documents.map((doc) => doc as unknown as Category);
    } catch (error) {
      console.error("Error fetching lands:", error);
      throw error;
    }
  }
}

export const dbServices = new DbServices();
