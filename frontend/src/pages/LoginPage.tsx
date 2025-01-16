import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "@/services/userService";
import { useLocalStorageListener } from "@/hooks/useLocalStorage";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useLocalStorageListener("userInfo", {});
  const [accessToken, setAccessToken] = useLocalStorageListener(
    "accessToken",
    ""
  );
  const [refreshToken, setRefreshToken] = useLocalStorageListener(
    "refreshToken",
    ""
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const ret = await userService.signIn(email, password);

    if (ret.success) {
      setUserInfo(ret.data);
      setAccessToken(ret.accessToken);
      setRefreshToken(ret.refreshToken);
      navigate("/");
    } else {
      setError(ret.message || "登录失败，请重试");
    }

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and App Name */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-500 rounded-[1.5rem] flex items-center justify-center mb-4 shadow-lg">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-white rounded-full transform -translate-x-2"></div>
              <div className="absolute inset-0 bg-yellow-300 rounded-full transform translate-x-2"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-400 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">AI用药管家</h1>
          <p className="text-gray-500">智能用药提醒助手</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-emerald-600 mb-2">
                欢迎登录
              </h2>
              <p className="text-gray-500">很高兴再次见到您！</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-500 mb-1 block">邮箱</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      name="email"
                      type="text"
                      className="pl-10 h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="请输入邮箱"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 mb-1 block">密码</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="请输入密码"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                className="w-full h-12 text-base bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>

            <p className="text-center text-gray-500">
              还没有账号？{" "}
              <Link
                to="/register"
                className="text-gray-900 font-semibold hover:text-emerald-600"
              >
                立即注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
