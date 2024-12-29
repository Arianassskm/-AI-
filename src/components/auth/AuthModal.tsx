import { X } from 'lucide-react';
import { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl w-[90%] max-w-md overflow-hidden shadow-xl">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {mode === 'signin' ? '欢迎回来' : '创建账号'}
            </h2>
            <p className="text-gray-600 mb-6">
              {mode === 'signin' 
                ? '登录以使用更多功能' 
                : '注册成为会员，享受完整功能'}
            </p>

            {mode === 'signin' ? (
              <SignInForm onClose={onClose} />
            ) : (
              <SignUpForm onClose={onClose} />
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'signin' ? '还没有账号？' : '已有账号？'}
                <button
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-blue-600 font-medium hover:text-blue-700 ml-1"
                >
                  {mode === 'signin' ? '立即注册' : '立即登录'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}