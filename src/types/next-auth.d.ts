import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
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
