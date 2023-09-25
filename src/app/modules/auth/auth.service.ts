import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const SignUp = async (data: User): Promise<Partial<User>> => {
  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({ where: { email } });

  if (!isUserExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User does not exist. please try again'
    );
  }

  if (isUserExist?.password && password !== isUserExist.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sorry! wrong authentication');
  }

  const { id, role } = isUserExist;

  const token = jwtHelpers.createToken(
    {
      role: role,
      userId: id,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    token,
  };
};

export const AuthService = {
  SignUp,
  login,
};
