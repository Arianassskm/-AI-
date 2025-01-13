import { useState } from "react";
import { LogOut } from "lucide-react";
import { AuthModal } from "../auth/AuthModal";
import { useLocalStorageListener } from "@/hooks/useLocalStorage";

export function ProfileHeader() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userInfo, setUserInfo] = useLocalStorageListener("userInfo", {});
  const [isLogin, setIsLogIn] = useLocalStorageListener("isLogin", false);

  const open = () => {
    setShowAuthModal(true);
  };
  const close = () => {
    console.log(userInfo);
    setShowAuthModal(false);
  };

  const logout = () => {
    setUserInfo({});
    setIsLogIn(false);
  };
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-32 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600" />
      {isLogin && (
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
      )}

      {!isLogin && (
        <div className="flex justify-center mt-4">
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={open}
          >
            登录
          </button>
        </div>
      )}

      <AuthModal isOpen={showAuthModal} onClose={close} />
    </div>
  );
}
