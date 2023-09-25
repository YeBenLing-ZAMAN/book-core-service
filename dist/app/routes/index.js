"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("../modules/auth/auth.router");
const book_router_1 = require("../modules/book/book.router");
const category_router_1 = require("../modules/category/category.router");
const order_router_1 = require("../modules/order/order.router");
const profile_router_1 = require("../modules/profile/profile.router");
const user_router_1 = require("../modules/user/user.router");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: '/auth', route: auth_router_1.AuthRouter },
    { path: '/users', route: user_router_1.UserRouter },
    { path: '/categories', route: category_router_1.CategoryRouter },
    { path: '/books', route: book_router_1.BookRouter },
    { path: '/profile', route: profile_router_1.ProfileRouter },
    { path: '/orders', route: order_router_1.OrderRouter },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
