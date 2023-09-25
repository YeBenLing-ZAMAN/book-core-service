"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constants_1 = require("./book.constants");
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, minPrice, maxPrice, category } = filters;
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constants_1.bookSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.book.findMany({
        where: whereCondition,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.book.count();
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
});
const getSingleCategoryBooksOrBookId = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    if (result.length > 0) {
        const total = yield prisma_1.default.book.count();
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
    const singleBookResult = yield prisma_1.default.book.findUnique({
        where: {
            id: categoryId,
        },
    });
    return singleBookResult;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleCategoryBooksOrBookId,
    updateBook,
    deleteBook,
};
