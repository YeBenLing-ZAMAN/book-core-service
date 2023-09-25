"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.get('/', book_controller_1.BookController.getAllBooks);
router.post('/create-book', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(book_validation_1.BookValidation.createBook), book_controller_1.BookController.createBook);
router.get('/:categoryId', book_controller_1.BookController.getSingleCategoryBooksOrBookId);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(book_validation_1.BookValidation.updateBook), book_controller_1.BookController.updateBook);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.deleteBook);
exports.BookRouter = router;
