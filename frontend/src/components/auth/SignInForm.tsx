import { useState } from "react";
import { authService } from "../../services/auth";
import { useLocalStorageListener } from "@/hooks/useLocalStorage";

interface SignInFormProps {
  onClose: () => void;
}

export function SignInForm({ onClose }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useLocalStorageListener("userInfo", {});
  const [isLogin, setIsLogin] = useLocalStorageListener("isLogin", false);
  const [accessToken, setAccessToken] = useLocalStorageListener(
    "accessToken",
    ""
  );
  const [refreshToken, setRefreshToken] = useLocalStorageListener(
    "refreshToken",
    ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const ret = await authService.signIn(email, password);
      console.log("userInfo:", ret);
      if (ret.success) {
        setUserInfo(ret.data);
        setAccessToken(ret.accessToken);
        setRefreshToken(ret.refreshToken);
        onClose();
      } else {
        setError(ret.message);
      }
    } catch (err) {
      console.log(err);
      setError("登录失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          邮箱
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          密码
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? "登录中..." : "登录"}
      </button>
    </form>
  );
}
