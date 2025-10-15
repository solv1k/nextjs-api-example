import Api from "@/api/client";

/**
 * Профиль пользователя
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: {
    id: string;
    url: string;
  };
  balance: number;
}

/**
 * Ответ на запрос профиля пользователя
 */
export interface UserProfileResponse {
  data: UserProfile;
}

/**
 * API-клиент для работы с профилем пользователя
 */
export default class UserProfileApi {
  /**
   * Отправляет GET-запрос на получение профиля пользователя
   *
   * @returns Промис с API-ответом
   * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError
   */
  static async get(): Promise<UserProfileResponse> {
    return await Api.get("user/profile");
  }
}
