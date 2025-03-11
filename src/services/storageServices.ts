import { client } from "@/config/appwrite";
import { Storage, ID } from "appwrite";

class StorageServices {
  private bucketId: string;
  private storage: Storage;
  constructor() {
    this.bucketId = import.meta.env.VITE_APPWRITE_ASSETS_BUCKET_ID;
    this.storage = new Storage(client);
  }

  async uploadFile(file: File): Promise<string> {
    try {
      if (!file) throw new Error("No file provided.");

      const response = await this.storage.createFile(
        this.bucketId,
        ID.unique(),
        file
      );

      const previewUrl = this.storage.getFilePreview(
        this.bucketId,
        response.$id
      );

      return previewUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async getFilePreview(fileId: string) {
    return this.storage.getFilePreview(this.bucketId, fileId);
  }
}

export const storageServices = new StorageServices();
