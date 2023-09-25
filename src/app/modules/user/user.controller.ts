import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.getAllUser();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrived successfully',
    data: result,
  });
});

export const UserController = {
  getAllUser,
};
