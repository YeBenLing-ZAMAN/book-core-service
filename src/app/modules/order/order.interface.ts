export type ISingleCategory = {
  books: {
    id: string;
    title: string;
    author: string;
    price: number;
    genre: string;
    publicationDate: Date;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  id?: string | undefined;
  title?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
};
