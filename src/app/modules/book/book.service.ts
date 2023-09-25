/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { bookSearchableFields } from './book.constants';
import { IBookFilterRequest } from './book.interface';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);

  const { search, minPrice, maxPrice, category } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: parseInt(minPrice),
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: parseInt(maxPrice),
      },
    });
  }

  if (category !== undefined) {
    andConditions.push({
      categoryId: category,
    });
  }

  const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereCondition,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.book.count();
  let totalPage = 0;
  if (typeof size !== 'undefined') {
    totalPage = Math.ceil(total / size);
  }

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const getSingleCategoryBooksOrBookId = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<any> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  if (result.length > 0) {
    const total = await prisma.book.count();

    let totalPage = 0;
    if (typeof size !== 'undefined') {
      totalPage = Math.ceil(total / size);
    }

    return {
      meta: {
        page,
        size,
        total,
        totalPage,
      },
      data: result,
    };
  }

  const singleBookResult = await prisma.book.findUnique({
    where: {
      id: categoryId,
    },
  });

  return singleBookResult;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleCategoryBooksOrBookId,
  updateBook,
  deleteBook,
};
