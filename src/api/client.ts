import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import ApiErrorHandler from "./errors/handler";

import { siteConfig } from "@/config/site";

/**
 * Базовый API-клиент
 */
export default class Api {
  /**
   * Корневой URL (endpoint)
   */
  private static baseUrl: string =
    process.env.NEXT_PUBLIC_API_URL || siteConfig.apiEndpoint;

  /**
   * Токен авторизации
   */
  private static bearerToken: string | null = null;

  /**
   * Экземпляр axios
   */
  private static axiosInstance = axios.create({
    baseURL: this.baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  /**
   * Устанавливает токен авторизации
   *
   * @param token Токен авторизации
   */
  static setBearerToken(token: string): void {
    this.bearerToken = token;
    this.axiosInstance.defaults.headers.common["Authorization"] =
      `Bearer ${token}`;
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
    delete this.axiosInstance.defaults.headers.common["Authorization"];
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
   * Добавляет timestamp к параметрам
   *
   * @param params Параметры запроса
   * @returns Параметры с timestamp
   */
  private static appendTimestamp(params: any = {}): any {
    return {
      ...params,
      _t: Date.now(),
    };
  }

  /**
   * Обрабатывает ошибки axios
   *
   * @param error Ошибка axios
   * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, ValidationError
   */
  private static async handleError(error: any): Promise<void> {
    if (error.response) {
      await ApiErrorHandler.handle(error.response);
    }
  }

  /**
   * Отправляет API-запрос
   *
   * @param path URI
   * @param options Параметры запроса axios
   * @returns Промис с API-ответом
   * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, ValidationError
   */
  static async request(
    path: string,
    options: AxiosRequestConfig = {},
  ): Promise<any> {
    try {
      // Добавляем timestamp к параметрам
      const config: AxiosRequestConfig = {
        ...options,
        params: this.appendTimestamp(options.params),
        headers: {
          ...options.headers,
        },
      };

      const response: AxiosResponse = await this.axiosInstance.request({
        url: path,
        ...config,
      });

      return response.data;
    } catch (error: any) {
      return await this.handleError(error);
    }
  }

  /**
   * Отправляет GET-запрос
   *
   * @param path URI
   * @param params Параметры запроса
   * @returns Промис с API-ответом
   * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, ValidationError
   */
  static async get(path: string, params: any = {}): Promise<any> {
    return this.request(path, {
      method: "GET",
      params: this.appendTimestamp(params),
    });
  }

  /**
   * Отправляет POST-запрос
   *
   * @param path URI
   * @param data Данные для отправки
   * @param params Параметры запроса
   * @returns Промис с API-ответом
   * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, ValidationError
   */
  static async post(path: string, data?: any, params: any = {}): Promise<any> {
    return this.request(path, {
      method: "POST",
      data,
      params: this.appendTimestamp(params),
    });
  }
}
