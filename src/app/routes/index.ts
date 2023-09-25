import express from 'express';
import { AuthRouter } from '../modules/auth/auth.router';

const router = express.Router();

const moduleRoutes = [{ path: '/auth', route: AuthRouter }];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
