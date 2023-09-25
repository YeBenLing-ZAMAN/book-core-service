import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

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

export const AuthService = {
  SignUp,
};
