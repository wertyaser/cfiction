type Key = string | number;

interface Book {
  id: Key | null | undefined;
  title: string;
  downloads: number;
  image: string;
}

export const topBooks: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    downloads: 500,
    image: "/gatsby.jpg",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    downloads: 750,
    image: "/mockingbird.jpg",
  },
  {
    id: 3,
    title: "1984",
    downloads: 900,
    image: "/1984.jpg",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    downloads: 650,
    image: "/pride.jpg",
  },
  {
    id: 5,
    title: "Moby Dick",
    downloads: 300,
    image: "/mobydick.jpg",
  },
  {
    id: 6,
    title: "War and Peace",
    downloads: 450,
    image: "/warandpeace.jpg",
  },
];
