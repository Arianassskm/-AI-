import { PrismaClient } from "@prisma/client";
import { CreateMedicineDto, UpdateMedicineDto } from "../types/medicine.types";

const prisma = new PrismaClient();

export class MedicineService {
  async create(data: CreateMedicineDto) {
    return prisma.medicine.create({ data: { ...data } });
  }

  async findAll(userId: number) {
    return prisma.medicine.findMany({
      where: {
        userId,
        deleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(userId: number, id: number) {
    return prisma.medicine.findFirst({
      where: {
        id,
        userId,
        deleted: false,
      },
    });
  }

  async update(userId: number, data: UpdateMedicineDto) {
    const { id, ...updateData } = data;
    return prisma.medicine.update({
      where: {
        id,
        userId,
        deleted: false,
      },
      data: updateData,
    });
  }

  async delete(userId: number, id: number) {
    return prisma.medicine.update({
      where: {
        id,
        userId,
        deleted: false,
      },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });
  }

  async restore(userId: number, id: number) {
    return prisma.medicine.update({
      where: {
        id,
        userId,
        deleted: true,
      },
      data: {
        deleted: false,
        deletedAt: null,
      },
    });
  }

  async permanentDelete(userId: number, id: number) {
    return prisma.medicine.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async search(userId: number, query: string) {
    return prisma.medicine.findMany({
      where: {
        userId,
        deleted: false,
        OR: [
          { name: { contains: query } },
          { nameEn: { contains: query } },
          { manufacturer: { contains: query } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
