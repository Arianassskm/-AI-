import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const passwordUtil = {
  /**
   * 加密密码
   */
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  },

  /**
   * 验证密码
   */
  async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },
};
