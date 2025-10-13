import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, NetworkError, NotFoundError, ServiceUnavailableError, UnauthorizedError, ValidationError } from "./errors";

/**
 * Обработчик ошибок API-ответов
 */
export default class ApiErrorHandler {
    /**
     * Обрабатывает ошибку API-ответа
     * 
     * @param response Ответ
     * @throws NetworkError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, ValidationError
     */
    static async handle(response: Response): Promise<void> {

        if (response.status === 0) {
            throw new NetworkError;
        }

        if (response.status === 400) {
            const errorJson = await response.json();
            throw new BadRequestError(errorJson.message.text);
        }

        if (response.status === 401) {
            throw new UnauthorizedError;
        }

        if (response.status === 403) {
            throw new ForbiddenError;
        }

        if (response.status === 404) {
            throw new NotFoundError;
        }

        if (response.status === 409) {
            throw new ConflictError;
        }

        if (response.status === 422) {
            const errorJson = await response.json();
            throw new ValidationError(errorJson);
        }

        if (response.status === 500) {
            throw new InternalServerError;
        }

        if (response.status === 503) {
            throw new ServiceUnavailableError;
        }

        throw new Error(`HTTP error! status: ${response.status}`);
    }
}