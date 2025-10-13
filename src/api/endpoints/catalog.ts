import Api from "@/api/client";
import { PaginationMeta } from "@/api/types/pagination";

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
    }
}

/**
 * Ответ на успешное получение списка объявлений
 */
interface CatalogAdvertsResponse {
    data: Advert[];
    meta: PaginationMeta;
}

type availableSorts = "-created_at" | "created_at" | "-price" | "price";

export default class CatalogApi {
    /**
     * Возвращает URL для API-запроса `/catalog/{path}`
     * @param path URI
     * @returns URL
     */
    static url(path: string) {
        return `catalog/${path}`;
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
    static async getAdverts(page: number, size: number, sort: availableSorts = "-created_at"): Promise<CatalogAdvertsResponse> {
        if (page < 1) {
            page = 1;
        }

        if (size < 1) {
            size = 10;
        }

        if (size > 100) {
            size = 100;
        }

        return await Api.get(this.url(`adverts/all?page[number]=${page}&page[size]=${size}&sort=${sort}`));
    }
}