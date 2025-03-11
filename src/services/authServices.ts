import { client } from "@/config/appwrite";
import { Account, Client, ID, Models } from "appwrite";
import { AuthError } from "./error";
import { customToast } from "@/lib/utils";

class AuthServices {
  private client: Client;
  private account: Account;

  constructor() {
    this.client = client;
    this.account = new Account(this.client);
  }

  async createAccount({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<Models.User<Models.Preferences>> {
    console.log(email, name, password);
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      // Wait for login to complete
      await this.login({ email, password });
      return user;
    } catch (error: any) {
      console.log(error);
      customToast(error.message);
      throw AuthError.fromAppwriteError(error);
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Models.Session> {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error: any) {
      throw AuthError.fromAppwriteError(error);
    }
  }

  async getCurrentUser(): Promise<
    Models.User<Models.Preferences> | null | undefined
  > {
    try {
      const user = await this.account.get();
      return user;
    } catch (error: any) {
      console.log(error);
      if (error instanceof AuthError) {
        error.log();
      }
      return undefined;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSessions();
      console.log("user logged out");
    } catch (error: any) {
      throw AuthError.fromAppwriteError(error);
    }
  }
}

const authServices = new AuthServices();

export { authServices };
