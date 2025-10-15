import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";

interface EmailFormProps {
  email: string;
  errorText: string;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onSuccessSubmit: () => void;
  onError: (message: string) => void;
  onClose: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Форма ввода Email для входа в аккаунт
 */
export default function EmailForm({
  email,
  errorText,
  isLoading,
  onEmailChange,
  onSuccessSubmit,
  onError,
  onClose,
}: EmailFormProps): React.ReactElement {
  const validateEmail = useCallback(
    (email: string): boolean => {
      if (!email.trim()) {
        onError("Поле Email не может быть пустым.");

        return false;
      }

      if (!EMAIL_REGEX.test(email)) {
        onError("Некорректный формат Email.");

        return false;
      }

      return true;
    },
    [onError],
  );

  const handleSubmit = useCallback(() => {
    if (validateEmail(email)) {
      onSuccessSubmit();
    }
  }, [email, onSuccessSubmit]);

  const handleEmailKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Вход в аккаунт</ModalHeader>

      <ModalBody>
        {errorText && <Alert color="warning">{errorText}</Alert>}

        <Input
          autoComplete="email"
          disabled={isLoading}
          name="email"
          placeholder="Введите ваш email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onKeyDown={handleEmailKeyDown}
        />
      </ModalBody>

      <ModalFooter>
        <Button
          color="primary"
          disabled={isLoading}
          isLoading={isLoading}
          startContent={<EnvelopeIcon className="w-5 h-5" />}
          onPress={handleSubmit}
        >
          Получить код
        </Button>
        <Button onPress={onClose}>Закрыть</Button>
      </ModalFooter>
    </>
  );
}
