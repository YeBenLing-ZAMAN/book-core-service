import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
const router = express.Router();

router.get('/', BookController.getAllBooks);

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.createBook),
  BookController.createBook
);

router.get('/:categoryId', BookController.getSingleCategoryBooksOrBookId);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.updateBook),
  BookController.updateBook
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

export const BookRouter = router;
