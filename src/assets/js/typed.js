/**
 * 纯 JavaScript 打字动画效果
 * 使用方法：在 HTML 元素上添加 data-typed 属性
 * 
 * 示例：
 * <span data-typed='["你好", "世界"]'></span>
 * 
 * 可选配置（通过 data-* 属性）：
 * - data-typed: JSON 数组格式的字符串列表（必填）
 * - data-type-speed: 打字速度，毫秒（默认 100）
 * - data-delete-speed: 删除速度，毫秒（默认 50）
 * - data-pause-duration: 停顿时间，毫秒（默认 2000）
 * - data-loop: 是否循环（默认 true）
 * - data-cursor: 光标字符（默认 "|"）
 */

class TypedAnimation {
  constructor(element) {
    this.element = element;
    
    // 解析配置
    this.strings = JSON.parse(element.dataset.typed || '[]');
    this.typeSpeed = parseInt(element.dataset.typeSpeed) || 100;
    this.deleteSpeed = parseInt(element.dataset.deleteSpeed) || 50;
    this.pauseDuration = parseInt(element.dataset.pauseDuration) || 2000;
    this.loop = element.dataset.loop !== 'false';
    this.cursorChar = element.dataset.cursor || '|';
    
    // 状态
    this.stringIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    
    // 创建 DOM 结构
    this.textSpan = document.createElement('span');
    this.cursorSpan = document.createElement('span');
    this.cursorSpan.className = 'typed-cursor';
    this.cursorSpan.textContent = this.cursorChar;
    
    this.element.appendChild(this.textSpan);
    this.element.appendChild(this.cursorSpan);
    
    // 添加光标闪烁样式
    this.addCursorStyle();
    
    // 开始动画
    if (this.strings.length > 0) {
      this.tick();
    }
  }
  
  addCursorStyle() {
    // 检查是否已添加样式
    if (document.getElementById('typed-cursor-style')) return;
    
    const style = document.createElement('style');
    style.id = 'typed-cursor-style';
    style.textContent = `
      .typed-cursor {
        margin-left: 2px;
        animation: typed-cursor-blink 1s linear infinite;
      }
      @keyframes typed-cursor-blink {
        0%, 20%, 80%, 100% { opacity: 1; }
        30%, 70% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  tick() {
    const currentString = this.strings[this.stringIndex];
    
    if (this.isDeleting) {
      // 删除字符
      this.charIndex--;
      this.textSpan.textContent = currentString.substring(0, this.charIndex);
      
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.stringIndex = (this.stringIndex + 1) % this.strings.length;
        
        // 如果不循环且已完成所有字符串
        if (!this.loop && this.stringIndex === 0) {
          this.stringIndex = this.strings.length - 1;
          this.charIndex = this.strings[this.stringIndex].length;
          this.textSpan.textContent = this.strings[this.stringIndex];
          return;
        }
        
        setTimeout(() => this.tick(), this.typeSpeed);
      } else {
        setTimeout(() => this.tick(), this.deleteSpeed);
      }
    } else {
      // 打字
      this.charIndex++;
      this.textSpan.textContent = currentString.substring(0, this.charIndex);
      
      if (this.charIndex === currentString.length) {
        // 打完一个字符串，暂停后开始删除
        this.isDeleting = true;
        setTimeout(() => this.tick(), this.pauseDuration);
      } else {
        setTimeout(() => this.tick(), this.typeSpeed);
      }
    }
  }
}

// 自动初始化所有带 data-typed 属性的元素
function initTypedAnimations() {
  document.querySelectorAll('[data-typed]').forEach(element => {
    new TypedAnimation(element);
  });
}

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTypedAnimations);
} else {
  initTypedAnimations();
}

// 导出供外部使用
export { TypedAnimation, initTypedAnimations };
