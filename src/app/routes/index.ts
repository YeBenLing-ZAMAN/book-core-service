import express from 'express';
import { AuthRouter } from '../modules/auth/auth.router';
import { BookRouter } from '../modules/book/book.router';
import { CategoryRouter } from '../modules/category/category.router';
import { OrderRouter } from '../modules/order/order.router';
import { ProfileRouter } from '../modules/profile/profile.router';
import { UserRouter } from '../modules/user/user.router';

const router = express.Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRouter },
  { path: '/users', route: UserRouter },
  { path: '/categories', route: CategoryRouter },
  { path: '/books', route: BookRouter },
  { path: '/profile', route: ProfileRouter },
  { path: '/orders', route: OrderRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
