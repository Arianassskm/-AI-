/**
 * 处理移动端视口高度
 */
export function setupViewport() {
  // 处理iOS Safari 100vh问题
  const setAppHeight = () => {
    const doc = document.documentElement;
    const height = window.innerHeight;
    doc.style.setProperty('--app-height', `${height}px`);
  };

  // 初始设置
  setAppHeight();

  // 监听窗口大小变化和设备方向变化
  window.addEventListener('resize', setAppHeight);
  window.addEventListener('orientationchange', () => {
    // 延迟执行以确保获取正确高度
    setTimeout(setAppHeight, 100);
  });

  // 监听软键盘弹出
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      const height = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${height}px`);
    });
  }

  // 禁用双击缩放
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });
}