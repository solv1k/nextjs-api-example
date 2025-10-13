export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js API Example",
  description: "Пример использования API в приложении Next.js",
  apiEndpoint: "http://localhost/api/v1",
  navItems: [
    {
      label: "Главная",
      href: "/",
    },
    {
      label: "Каталог",
      href: "/catalog",
    },
  ],
  navMenuItems: [
    {
      label: "Главная",
      href: "/",
    },
    {
      label: "Каталог",
      href: "/catalog",
    },
  ],
  links: {
    github: "https://github.com/solv1k/nextjs-api-example",
  },
};
