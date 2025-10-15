# Next.js + API

Пример использования API в приложении Next.js

## Фреймворки и библиотеки использованные в проекте

- [Next.js v15.5](https://nextjs.org/docs/getting-started)
- [HeroUI v2.8](https://heroui.com/)
- [Tailwind CSS v4.1](https://tailwindcss.com/)
- [Tailwind Variants v3.0](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Инструкция по установке и запуску среды разработки

### Установка пакетов и зависимостей

Вы можете использовать один из менеджеров пакетов: `npm`, `yarn`, `pnpm`, `bun`, например `npm`:

```bash
npm install
```

### Настройка среды разработки

1. Прежде чем запустить приложение, необходимо скопировать файл `.env.example`:

```bash
cp .env.example .env
```

2. Измените `NEXT_PUBLIC_API_URL` в файле `.env` на свой:

```bash
# в файле .env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1 # укажите ваш API URL
```

### Запуск среды разработки

```bash
npm run dev
```

## Инструкция по сборке и запуску приложения в Docker

### Сборка приложения

```bash
npm run docker:build
```

### Запуск приложения

```bash
npm run docker:run
```

## Инструкция по сборке и запуску приложения в Production

### Сборка приложения

```bash
npm run build
```

### Запуск приложения

```bash
npm run start
```
