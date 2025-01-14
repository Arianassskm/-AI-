import { LogOut } from "lucide-react";
import { useLocalStorageListener } from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export function ProfileHeader() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useLocalStorageListener("userInfo", {});
  const [accessToken, setAccessToken] = useLocalStorageListener(
    "accessToken",
    ""
  );
  const [refreshToken, setRefreshToken] = useLocalStorageListener(
    "refreshToken",
    ""
  );

  const logout = () => {
    setAccessToken("");
    setRefreshToken("");
    setUserInfo({});
    navigate("/login");
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-32 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600" />
      <div>
        {/* Profile Info */}
        <div className="relative -mt-16 text-center">
          <div className="inline-block relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
              alt={userInfo.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <button
              className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
              onClick={logout}
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="mt-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              {userInfo.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{userInfo.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
