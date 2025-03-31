import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      isAdmin: object;
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    isAdmin?: boolean;
  }
}

export interface Book {
  title: string;
  author: string;
  bookId: string;
  bookUrl: string;
  downloadUrl: string;
  coverUrl?: string;
  source?: string;
  fileFormat?: string;
}

export interface OpenLibraryDoc {
  key: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  language?: string[];
  ebook_access?: string;
  ia?: string[];
}

export interface DownloadedBook {
  bookid: string;
  title: string;
  bookurl: string;
  downloadurl: string;
  created_at: string;
}

export interface SearchHistoryItem {
  query: string;
  created_at: string;
}

export interface DbUser {
  id: string;
  name: string | null;
  email: string;
  emailVerified: string | null;
  image: string | null;
  password: string;
  isAdmin: number; // 0 or 1
}

export interface DbAdmin {
  id: string;
  email: string;
  password: string;
  created_at?: number;
  isAdmin: boolean;
}
