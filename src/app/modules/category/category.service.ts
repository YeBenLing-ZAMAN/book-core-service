import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ISingleCategory } from './category.interface';

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};

const getAllCategories = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({});

  return result;
};

const getSingleCategory = async (
  id: string
): Promise<ISingleCategory | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  const booksOfThisCategory = await prisma.book.findMany({
    where: {
      genre: result?.title,
    },
  });

  const data = {
    ...result,
    books: booksOfThisCategory ?? [],
  };

  return data;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
};
