import { useGlobalStore } from "@/stores/global";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";

/**
 * Модальное окно для подтверждения выхода из аккаунта
 * 
 * @returns React.ReactElement
 */
export default function LogoutModal(): React.ReactElement {
    const { isShowLogoutModal, logout, setIsShowLogoutModal } = useGlobalStore();

    const handleLogout = () => {
        logout();
        setIsShowLogoutModal(false);
    };

    return (
        <Modal
            isOpen={isShowLogoutModal}
            onOpenChange={setIsShowLogoutModal}
            placement="center"
        >
            <ModalContent>
                <ModalHeader>
                    Выход из аккаунта
                </ModalHeader>
                <ModalBody>
                    <Alert color="warning">Вы действительно хотите выйти из аккаунта?</Alert>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={handleLogout} color="danger">
                        Да, выйти
                    </Button>
                    <Button onPress={() => setIsShowLogoutModal(false)}>
                        Остаться
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}