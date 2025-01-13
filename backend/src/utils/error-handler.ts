export class AppError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = (error: any) => {
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      message: error.message,
    };
  }
  return {
    status: 500,
    message: "服务器内部错误",
  };
};
