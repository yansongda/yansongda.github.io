// TOC 目录交互：折叠/展开、滚动高亮、平滑滚动
const initToc = () => {
  const panel = document.getElementById("toc-panel");
  const toggle = document.getElementById("toc-toggle");
  const close = document.getElementById("toc-close");
  const list = document.getElementById("toc-list");

  if (!panel || !toggle || !close || !list) return;

  const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

  // 桌面默认展开；移动端默认折叠。用户手动折叠/展开后记住偏好
  let userPref = null;
  try {
    const saved = localStorage.getItem("toc-collapsed");
    if (saved === "true" || saved === "false") userPref = saved === "true";
  } catch {
    /* ignore */
  }

  const render = () => {
    const collapsed = userPref !== null ? userPref : !isDesktop();

    if (collapsed) {
      panel.classList.add("hidden");
      panel.classList.remove("lg:block");
      toggle.classList.remove("hidden");
      toggle.classList.add("flex");
    } else {
      panel.classList.remove("hidden");
      panel.classList.add("lg:block");
      toggle.classList.add("hidden");
      toggle.classList.remove("flex");
    }
  };

  const setCollapsed = (collapsed) => {
    userPref = collapsed;
    try {
      localStorage.setItem("toc-collapsed", String(collapsed));
    } catch {
      /* ignore */
    }
    render();
  };

  toggle.addEventListener("click", () => setCollapsed(false));
  close.addEventListener("click", () => setCollapsed(true));

  // 点击目录项平滑滚动
  list.addEventListener("click", (event) => {
    const item = event.target.closest("a[data-toc-item]");
    if (!item) return;

    event.preventDefault();
    const target = document.getElementById(item.getAttribute("href").slice(1));
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", item.getAttribute("href"));
  });

  // 滚动高亮当前章节
  const items = [...list.querySelectorAll("a[data-toc-item]")];
  const targetMap = new Map();
  items.forEach((item) => {
    const el = document.getElementById(item.getAttribute("href").slice(1));
    if (el) targetMap.set(el, item);
  });

  if (targetMap.size === 0) return;

  const activeClass = [
    "text-neutral-900",
    "dark:text-white",
    "bg-neutral-100",
    "dark:bg-neutral-800",
  ];

  const setActive = (item) => {
    items.forEach((x) => {
      x.classList.remove(...activeClass);
    });
    if (item) item.classList.add(...activeClass);
  };

  const visible = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.add(entry.target.id);
        } else {
          visible.delete(entry.target.id);
        }
      });

      // 高亮文档顺序中最靠前的可见标题
      let first = null;
      for (const el of targetMap.keys()) {
        if (visible.has(el.id)) {
          first = targetMap.get(el);
          break;
        }
      }
      setActive(first);
    },
    { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
  );

  targetMap.forEach((_, el) => {
    observer.observe(el);
  });

  // 页面加载时先算一次
  setActive(null);

  render();
  window.addEventListener("resize", render);
};

document.addEventListener("DOMContentLoaded", initToc);
