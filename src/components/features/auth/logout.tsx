import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useCallback } from "react";

import { useGlobalStore } from "@/stores/global";

/**
 * Модальное окно для подтверждения выхода из аккаунта
 *
 * @returns React.ReactElement
 */
export default function LogoutModal(): React.ReactElement {
  const { isShowLogoutModal, logout, setIsShowLogoutModal } = useGlobalStore();

  const handleLogout = useCallback(() => {
    logout();
    setIsShowLogoutModal(false);
  }, [logout]);

  return (
    <Modal
      isOpen={isShowLogoutModal}
      placement="center"
      onOpenChange={setIsShowLogoutModal}
    >
      <ModalContent>
        <ModalHeader>Выход из аккаунта</ModalHeader>
        <ModalBody>
          <Alert color="warning">
            Вы действительно хотите выйти из аккаунта?
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={handleLogout}>
            Да, выйти
          </Button>
          <Button onPress={() => setIsShowLogoutModal(false)}>Остаться</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
