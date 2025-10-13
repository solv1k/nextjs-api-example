import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

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
    const validateEmail = (email: string): boolean => {
        if (!email.trim()) {
            onError("Поле Email не может быть пустым.");
            return false;
        }

        if (!EMAIL_REGEX.test(email)) {
            onError("Некорректный формат Email.");
            return false;
        }

        return true;
    };

    const handleEmailKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (validateEmail(email)) {
            onSuccessSubmit();
        }
    };

    return (
        <>
            <ModalHeader className="flex flex-col gap-1">Вход в аккаунт</ModalHeader>

            <ModalBody>
                {errorText && <Alert color="warning">{errorText}</Alert>}

                <Input
                    autoFocus
                    name="email"
                    autoComplete="email"
                    type="email"
                    placeholder="Введите ваш email"
                    onChange={(e) => onEmailChange(e.target.value)}
                    onKeyDown={handleEmailKeyDown}
                    value={email}
                    disabled={isLoading}
                />
            </ModalBody>

            <ModalFooter>
                <Button
                    onPress={handleSubmit}
                    disabled={isLoading}
                    isLoading={isLoading}
                    color="primary"
                    startContent={<EnvelopeIcon className="w-5 h-5" />}
                >
                    Получить код
                </Button>
                <Button onPress={onClose}>
                    Закрыть
                </Button>
            </ModalFooter>
        </>
    );
}