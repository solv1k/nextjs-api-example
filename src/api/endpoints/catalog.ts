import Api from "@/api/client";
import { PaginationMeta } from "@/api/types/pagination";
import {
  AvailableSort,
  CatalogAdvertType,
  RequestFilterArray,
  RequestFilterInput,
} from "@/types/catalog";

/**
 * Объявление
 */
export interface Advert {
  id: number;
  title: string;
  description: string;
  price: number;
  main_image: {
    id: string;
    url: string;
  };
}

/**
 * Ответ на успешное получение списка объявлений
 */
interface CatalogAdvertsResponse {
  data: Advert[];
  meta: PaginationMeta;
}

export default class CatalogApi {
  /**
   * Возвращает URL для API-запроса `/catalog/{path}`
   * @param path URI
   * @returns URL
   */
  static url(path: string) {
    return `catalog/${path}`;
  }

  private static normalizeFilters(
    filters: RequestFilterInput,
  ): RequestFilterArray | null {
    if (!filters) return null;

    if (Array.isArray(filters)) {
      return filters;
    }

    // Конвертируем Record в массив
    return Object.entries(filters) as RequestFilterArray;
  }

  /**
   * Формирует query-строку для фильтров
   * @param filters Массив фильтров
   * @returns Query-строка
   */
  private static buildFiltersQuery(filters: RequestFilterArray | null): string {
    if (!filters || filters.length === 0) {
      return "";
    }

    const queryParams: string[] = [];

    filters.forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Для массивов: filter[type]=website,domain,game
        queryParams.push(`filter[${key}]=${value.join(",")}`);
      } else {
        // Для одиночных значений: filter[min_price]=1000
        queryParams.push(`filter[${key}]=${value}`);
      }
    });

    return queryParams.join("&");
  }

  /**
   * Отправляет GET-запрос на получение списка объявлений
   *
   * @param page Номер страницы
   * @param size Количество объявлений на странице
   * @param sort Сортировка
   * @returns Промис с API-ответом
   * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError
   */
  static async getAdverts(
    page: number,
    size: number,
    types: CatalogAdvertType[] = [],
    sort: AvailableSort[] = ["-created_at"],
    filters: RequestFilterInput = null,
  ): Promise<CatalogAdvertsResponse> {
    // Проверяем входные данные
    if (page < 1) {
      page = 1;
    }

    if (size < 1) {
      size = 10;
    }

    if (size > 100) {
      size = 100;
    }

    // Формируем базовый URL
    let url = this.url(`adverts/all`);

    // Добавляем пагинацию
    url += `?page[number]=${page}&page[size]=${size}`;

    // Добавляем сортировку, если она есть
    if (sort.length > 0) {
      url += `&sort=${sort.join(",")}`;
    }

    // Добавляем типы объявлений, если они есть
    if (types.length > 0) {
      url += `&filter[type]=${types.join(",")}`;
    }

    // Конвертируем Record в массив, если нужно
    const RequestFilterArray = this.normalizeFilters(filters);

    // Добавляем фильтры, если они есть
    const filtersQuery = this.buildFiltersQuery(RequestFilterArray);

    if (filtersQuery) {
      url += `&${filtersQuery}`;
    }

    // Отправляем запрос и возвращаем промис с ответом
    return await Api.get(url);
  }
}
