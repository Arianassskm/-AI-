import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { Checkbox } from "@/components/ui/Checkbox";
import { userService } from "@/services/userService";

export function RegisterPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) return;

    if (!agreedToTerms) {
      toast("请同意用户协议和隐私政策", "error");
      return;
    }

    if (password !== confirmPassword) {
      toast("两次输入的密码不一致", "error");
      return;
    }

    setIsRegistering(true);
    try {
      const ret = await userService.signUp(email, password);
      if (ret.success) {
        toast("注册成功！", "success");
        navigate("/login");
      } else {
        toast(ret.message, "error");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast("注册失败，请重试", "error");
    } finally {
      setIsRegistering(false);
    }
  };

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

        {/* Registration Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-emerald-600 mb-2">
                用户注册
              </h2>
              <p className="text-gray-500">欢迎加入我们！</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-500 mb-1 block">邮箱</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <div>
                  <label className="text-gray-500 mb-1 block">确认密码</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="请再次输入密码"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked)}
                  label={
                    <>
                      登录及注册即代表同意
                      <Link
                        to="#"
                        className="text-emerald-500 hover:text-emerald-600"
                      >
                        用户协议
                      </Link>{" "}
                      及{" "}
                      <Link
                        to="#"
                        className="text-emerald-500 hover:text-emerald-600"
                      >
                        隐私政策
                      </Link>
                    </>
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isRegistering}
              >
                {isRegistering ? "注册中..." : "立即注册"}
              </Button>
            </form>

            <p className="text-center text-gray-500">
              已有账号？{" "}
              <Link
                to="/login"
                className="text-gray-900 font-semibold hover:text-emerald-600"
              >
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
