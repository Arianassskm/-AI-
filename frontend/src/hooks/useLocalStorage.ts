import { useState, useEffect, useCallback } from "react";

export function useLocalStorageListener<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // 创建广播频道
  const broadcastChannel = new BroadcastChannel("app-storage");

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

  // 更新值的函数
  const setValue = useCallback(
    (value: T) => {
      try {
        // 处理函数类型的值
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // 更新 state
        setStoredValue(valueToStore);

        // 更新 localStorage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));

          // 发送自定义事件用于同页面通信
          window.dispatchEvent(
            new CustomEvent("local-storage-change", {
              detail: { key, value: valueToStore },
            })
          );

          // 使用 BroadcastChannel 进行跨页面通信
          // broadcastChannel.postMessage({
          //   key,
          //   value: valueToStore,
          //   timestamp: Date.now(),
          // });
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    // 处理来自其他页面的 storage 事件
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
      }
    };

    // 处理同一页面内的更新
    const handleLocalChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value);
      }
    };

    // 处理 BroadcastChannel 消息
    const handleBroadcast = (e: MessageEvent) => {
      if (e.data.key === key) {
        setStoredValue(e.data.value);
      }
    };

    if (typeof window !== "undefined") {
      // 添加事件监听器
      window.addEventListener("storage", handleStorageChange);
      window.addEventListener(
        "local-storage-change",
        handleLocalChange as EventListener
      );
      broadcastChannel.addEventListener("message", handleBroadcast);

      // 清理函数
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener(
          "local-storage-change",
          handleLocalChange as EventListener
        );
        broadcastChannel.removeEventListener("message", handleBroadcast);
        broadcastChannel.close();
      };
    }
  }, [key, initialValue]);

  return [storedValue, setValue];
}

export function getValue(key: string) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : "";
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return "";
  }
}
