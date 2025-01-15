import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreatePlanInput {
  name: string;
  startDate: Date;
  endDate: Date;
  userId: number;
  details: {
    medicineId: number;
    dosage: number;
    frequency: number;
    timing: string;
  }[];
}

export class MedicinePlanService {
  // 创建用药计划
  async createPlan(data: CreatePlanInput) {
    return await prisma.medicinePlan.create({
      data: {
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        userId: data.userId,
        // 创建计划的同时创建明细，Prisma 会自动处理关联
        details: {
          create: data.details.map((detail) => ({
            medicineId: detail.medicineId,
            dosage: detail.dosage,
            frequency: detail.frequency,
            timing: detail.timing,
          })),
        },
      },
      include: {
        details: {},
      },
    });
  }

  // 获取用户的所有用药计划
  async getUserPlans(userId: number) {
    return await prisma.medicinePlan.findMany({
      where: {
        userId,
        deleted: false,
      },
      include: {
        details: {},
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // 获取单个用药计划详情
  async getPlanById(id: number, userId: number) {
    return await prisma.medicinePlan.findFirst({
      where: {
        id,
        userId,
        deleted: false,
      },
      include: {
        details: {},
      },
    });
  }

  // 更新用药计划
  async updatePlan(id: number, userId: number, data: Partial<CreatePlanInput>) {
    // 首先删除旧的明细
    await prisma.medicinePlanDetail.deleteMany({
      where: {
        planId: id,
      },
    });

    // 更新计划和创建新的明细
    return await prisma.medicinePlan.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        details: {
          create: data.details,
        },
      },
      include: {
        details: {},
      },
    });
  }

  // 软删除用药计划
  async deletePlan(id: number, userId: number) {
    return await prisma.medicinePlan.update({
      where: {
        id,
      },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
