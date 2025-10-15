import { AvailableFilter, CatalogAdvertType } from "@/types/catalog";

export type CatalogConfig = typeof catalogConfig;

export const catalogConfig = {
  perPage: 20,
  perPageOptions: [20, 40, 60, 80, 100],
  commonFilters: [
    {
      key: "is_ai",
      type: "boolean",
      label: "Проект cвязан с ИИ",
    },
    {
      key: "price",
      type: "range",
      label: "Цена",
      minValue: 0,
      maxValue: 99999999,
    },
    {
      key: "transfer_days_count",
      type: "radio",
      label: "Срок переноса",
      options: [
        {
          key: "1",
          label: "24 часа",
        },
        {
          key: "3",
          label: "До 3 дней",
        },
        {
          key: "7",
          label: "До 7 дней",
        },
      ],
    },
  ] as AvailableFilter[],
  categories: [
    {
      key: "websites",
      title: "Сайты и домены",
      types: ["website", "domain"],
      filters: [
        {
          key: "type",
          type: "multiple",
          label: "Тип актива",
          options: [
            {
              key: "website",
              label: "Сайт",
            },
            {
              key: "domain",
              label: "Домен",
            },
          ],
        },
        {
          key: "website_subtype",
          type: "multiple",
          label: "Тип сайта",
          options: [
            {
              key: "full",
              label: "С доменом",
            },
            {
              key: "script",
              label: "Исходный код",
            },
          ],
        },
        {
          key: "website_type",
          type: "multiple",
          label: "Вид сайта",
          options: [
            {
              key: "landing",
              label: "Лендинг",
            },
            {
              key: "info",
              label: "Информационный сайт",
            },
            {
              key: "shop",
              label: "Интернет-магазин",
            },
            {
              key: "service",
              label: "Онлайн-сервис",
            },
            {
              key: "blog",
              label: "Блог",
            },
            {
              key: "forum",
              label: "Форум",
            },
          ],
        },
      ],
    },
    {
      key: "socials",
      title: "Соц.сети",
      types: ["sn"],
      filters: [
        {
          key: "is_profitable",
          type: "radio",
          label: "Доходность",
          options: [
            {
              key: "1",
              label: "C доходом или аудиторией",
            },
            {
              key: "0",
              label: "Для инвайта",
            },
          ],
        },
        {
          key: "sn_type",
          type: "multiple",
          label: "Соц.сеть",
          options: [
            {
              key: "tg_channel,tg_chat",
              label: "Telegram",
            },
            {
              key: "vk",
              label: "VK",
            },
            {
              key: "ok",
              label: "Одноклассники",
            },
            {
              key: "dzen",
              label: "Яндекс.Дзен",
            },
            {
              key: "rutube",
              label: "RuTube",
            },
            {
              key: "youtube",
              label: "YouTube",
            },
          ],
        },
        {
          key: "subscribers",
          type: "range",
          label: "Подписчики",
          minValue: 0,
          maxValue: 99999999,
        },
        {
          key: "sn_category",
          type: "multiple",
          label: "Тематика",
          options: [
            {
              key: "business",
              label: "Бизнес и финансы",
            },
            {
              key: "marketing",
              label: "Маркетинг и реклама",
            },
            {
              key: "it",
              label: "IT и технологии",
            },
            {
              key: "education",
              label: "Образование и карьера",
            },
            {
              key: "media",
              label: "Новости и медиа",
            },
            {
              key: "relax",
              label: "Развлечения и игры",
            },
            {
              key: "lifestyle",
              label: "Лайфстайл",
            },
            {
              key: "food",
              label: "Еда и кулинария",
            },
            {
              key: "religion",
              label: "Культура и духовность",
            },
            {
              key: "other",
              label: "Другое",
            },
          ],
        },
      ],
    },
    {
      key: "games",
      title: "Игры",
      types: ["game"],
      filters: [
        {
          key: "is_profitable",
          type: "radio",
          label: "Доходность",
          options: [
            {
              key: "1",
              label: "C доходом или аудиторией",
            },
            {
              key: "0",
              label: "Для развития",
            },
          ],
        },
      ],
    },
    {
      key: "bots",
      title: "Боты",
      types: ["bot"],
      filters: [],
    },
    {
      key: "scripts",
      title: "Скрипты",
      types: ["script"],
      filters: [],
    },
    {
      key: "mpcards",
      title: "Карточки товаров",
      types: ["marketplace"],
      filters: [],
    },
  ] as {
    key: string;
    title: string;
    types: CatalogAdvertType[];
    filters: AvailableFilter[];
  }[],
};
