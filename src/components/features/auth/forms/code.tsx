import CodeInput from "@/components/ui/input/code";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";

interface CodeFormProps {
    code: string;
    errorText: string;
    isLoading: boolean;
    onCodeChange?: (code: string) => void;
    onCodeComplete: (code: string) => void;
    onBack: () => void;
}

const CODE_LENGTH = 6;

/**
 * Форма ввода одноразового Email-кода для входа в аккаунт
 */
export default function CodeForm({
    code,
    errorText,
    isLoading,
    onCodeChange,
    onCodeComplete,
    onBack,
}: CodeFormProps): React.ReactElement {
    return (
        <>
            <ModalHeader>Ввод Email-кода</ModalHeader>

            <ModalBody>
                {errorText && <Alert color="warning">{errorText}</Alert>}

                <CodeInput
                    length={CODE_LENGTH}
                    value={code}
                    disabled={isLoading}
                    style={{ marginBottom: "1rem" }}
                    onChange={onCodeChange}
                    onComplete={onCodeComplete}
                />
            </ModalBody>

            <ModalFooter>
                <Button
                    onPress={onBack}
                    disabled={isLoading}
                    isLoading={isLoading}
                >
                    Назад
                </Button>
            </ModalFooter>
        </>
    );
}