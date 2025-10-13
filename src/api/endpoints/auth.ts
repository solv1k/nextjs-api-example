import Api from "@/api/client";
import { UserProfile } from "./profile";

/**
 * Ответ на успешный логин
 */
export interface SuccessLoginResponse {
    data: {
        token: string;
        user_profile: UserProfile;
    }
}

/**
 * API-клиент для работы с авторизацией
 */
export default class AuthApi {
    /**
     * Возвращает URL для API-запроса `/auth/{path}`
     * 
     * @param path URI
     * @returns URL для API-запроса
     */
    static url(path: string): string {
        return `auth/${path}`;
    }

    /**
     * Отправляет одноразовый код авторизации на указанный email
     * 
     * @param email Email
     * @returns Промис с API-ответом
     * @throws NetworkError, BadRequestError, ForbiddenError, ConflictError, ValidationError
     */
    static async sendCode(email: string): Promise<any> {
        return await Api.post(this.url("send-code"), { email });
    }

    /**
     * Отправляет запрос на авторизацию пользователя по email и коду
     * 
     * @param email Email
     * @param code Одноразовый код авторизации
     * @returns Промис с API-ответом
     * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, ConflictError, ValidationError
     */
    static async login(email: string, code: string): Promise<SuccessLoginResponse> {
        return await Api.post(this.url("login"), { email, code });
    }

    /**
     * Отправляет запрос на выход из аккаунта
     * 
     * @returns Промис с API-ответом
     * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, ConflictError, ValidationError
     */
    static async logout(): Promise<any> {
        return await Api.post(this.url("logout"));
    }
}