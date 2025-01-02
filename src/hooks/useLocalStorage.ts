import { useState, useEffect } from "react";

export function useLocalStorageListener<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // 从 localStorage 读取初始值
  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // 更新 localStorage 和状态的函数
  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // 触发一个自定义事件，以便同一页面的其他组件也能接收到更新
        window.dispatchEvent(new Event("local-storage"));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    // 处理来自其他页面的 storage 事件
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
      }
    };

    // 处理同一页面内的更新
    const handleLocalChange = () => {
      setStoredValue(readValue());
    };

    // 添加事件监听器
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage", handleLocalChange);

    // 清理事件监听器
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleLocalChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}
