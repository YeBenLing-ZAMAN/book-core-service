import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constants';
import { BookService } from './book.service';

const createBook: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookService.createBook(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooks: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const result = await BookService.getAllBooks(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books retrieved successfully',
    data: result,
  });
});

const getSingleCategoryBooksOrBookId: RequestHandler = catchAsync(
  async (req, res) => {
    const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
    const result = await BookService.getSingleCategoryBooksOrBookId(
      req.params.categoryId,
      options
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Books retrieved successfully',
      data: result,
    });
  }
);

const updateBook: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await BookService.updateBook(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookService.deleteBook(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleCategoryBooksOrBookId,
  updateBook,
  deleteBook,
};
