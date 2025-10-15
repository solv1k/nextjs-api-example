/**
 * Базовый класс для всех API-ошибок
 */
export class ApiError extends Error {}

/**
 * Ошибка авторизации
 */
export class UnauthorizedError extends ApiError {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

/**
 * Ошибка доступа
 */
export class ForbiddenError extends ApiError {
  constructor() {
    super("Forbidden");
    this.name = "ForbiddenError";
  }
}

/**
 * Ошибка не найденного ресурса
 */
export class NotFoundError extends ApiError {
  constructor() {
    super("Not found");
    this.name = "NotFoundError";
  }
}

/**
 * Ошибка-конфликт
 */
export class ConflictError extends ApiError {
  constructor() {
    super("Conflict");
    this.name = "ConflictError";
  }
}

/**
 * Внутренняя ошибка сервера
 */
export class InternalServerError extends ApiError {
  constructor() {
    super("Internal server error");
    this.name = "InternalServerError";
  }
}

/**
 * Сервис недоступен
 */
export class ServiceUnavailableError extends ApiError {
  constructor() {
    super("Service unavailable");
    this.name = "ServiceUnavailableError";
  }
}

/**
 * Ошибка сети
 */
export class NetworkError extends ApiError {
  constructor() {
    super("Network error");
    this.name = "NetworkError";
  }
}

/**
 * Общая ошибка запроса
 */
export class BadRequestError extends ApiError {
  constructor(message?: string) {
    super(message || "Bad request");
    this.name = "BadRequestError";
  }
}

/**
 * Сообщение об ошибке валидации
 */
interface ValidationErrorMessage {
  key: string;
  text: string;
}

/**
 * Хранилище сообщений об ошибках валидации
 */
interface ValidationErrorBag {
  message: ValidationErrorMessage;
  data?: ValidationErrorMessage[];
}

/**
 * Ошибка валидации
 */
export class ValidationError extends ApiError {
  bag: ValidationErrorBag;
  messages?: ValidationErrorMessage[];

  constructor(bag: ValidationErrorBag) {
    super(bag.message.text);
    this.name = "ValidationError";
    this.bag = bag;
    this.messages = this.bag.data
      ? Object.values(this.bag.data).filter(
          (item): item is ValidationErrorMessage =>
            item && typeof item === "object" && "text" in item,
        )
      : undefined;
  }

  get all(): ValidationErrorMessage[] | undefined {
    return this.messages;
  }
}
