import { siteConfig } from "@/config/site";
import ApiErrorHandler from "./errors/handler";

/**
 * Базовый API-клиент
 */
export default class Api {
    /**
     * Корневой URL (endpoint)
     */
    private static baseUrl: string = process.env.NEXT_PUBLIC_API_URL || siteConfig.apiEndpoint;

    /**
     * Токен авторизации
     */
    private static bearerToken: string | null = null;

    /**
     * Устанавливает токен авторизации
     * 
     * @param token Токен авторизации
     */
    static setBearerToken(token: string): void {
        this.bearerToken = token;
    }

    /**
     * Возвращает токен авторизации
     * 
     * @returns Токен авторизации
     */
    static getBearerToken(): string | null {
        return this.bearerToken;
    }

    /**
     * Возвращает корневой URL (endpoint)
     * 
     * @returns URL
     */
    static getBaseUrl(): string {
        return this.baseUrl;
    }

    /**
     * Удаляет токен авторизации
     */
    static removeBearerToken(): void {
        this.bearerToken = null;
    }

    /**
     * Возвращает полный URL для API-запроса
     * 
     * @param path URI
     * @returns Полный URL
     */
    static url(path: string): string {
        return `${this.baseUrl}/${path}`;
    }

    /**
     * Возвращает заголовки авторизации
     * 
     * @returns Заголовки
     */
    static authHeaders(): Record<string, string> {
        const authHeaders: Record<string, string> = {};

        if (this.bearerToken) {
            authHeaders['Authorization'] = `Bearer ${this.bearerToken}`;
        }

        return authHeaders;
    }

    /**
     * Отправляет API-запрос
     * 
     * @param path URI
     * @param options Параметры запроса
     * @returns Промис с API-ответом
     * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, ValidationError
     */
    static async request(path: string, options: RequestInit = {}): Promise<any> {
        const response = await fetch(this.url(path), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...this.authHeaders(),
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            await ApiErrorHandler.handle(response);
        }

        return await response.json();
    }

    /**
     * Отправляет GET-запрос
     * 
     * @param path URI
     * @returns Промис с API-ответом
     * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, ValidationError
     */
    static async get(path: string): Promise<any> {
        return this.request(path);
    }

    /**
     * Отправляет POST-запрос
     * 
     * @param path URI
     * @param body Тело запроса
     * @returns Промис с API-ответом
     * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, ValidationError
     */
    static async post(path: string, body?: any): Promise<any> {
        return this.request(path, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }
}