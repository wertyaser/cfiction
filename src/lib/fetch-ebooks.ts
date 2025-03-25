export interface Book {
  edition?: {
    key: string;
    cover_url?: string;
  };
}

const apiUrl = "https://openlibrary.org";

export const fetchBooks = async (query: string): Promise<Book[]> => {
  if (!query) return [];
  try {
    const response = await fetch(`${apiUrl}/search/inside.json?q=${query}`);
    const data = await response.json();
    return data.hits?.hits || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
