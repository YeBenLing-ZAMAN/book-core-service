import { Order, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOrder = async (data: Order, userId: string): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      ...data,
      userId,
      orderedBooks: data.orderedBooks as Prisma.InputJsonValue,
    },
  });

  return result;
};

export const OrderService = {
  createOrder,
};
