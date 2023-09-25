import { User } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import { AuthService } from './auth.service';

const SignUp: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthService.SignUp(req.body);

  sendResponse<Partial<User>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});

const login: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfully',
    data: result,
  });
});

export const AuthController = {
  SignUp,
  login,
};
