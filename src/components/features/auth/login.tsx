"use client";

import { useState, useCallback } from "react";
import { Modal, ModalContent } from "@heroui/modal";

import EmailForm from "./forms/email";
import CodeForm from "./forms/code";

import AuthApi from "@/api/endpoints/auth";
import {
  BadRequestError,
  UnauthorizedError,
  ValidationError,
} from "@/api/errors/errors";
import { useGlobalStore } from "@/stores/global";

interface LoginFormState {
  email: string;
  code: string;
  showCodeForm: boolean;
  lastSendedEmail: string;
  errorText: string;
}

interface LoadingState {
  sendCode: boolean;
  login: boolean;
}

/**
 * Модальное окна для входа в аккаунт
 *
 * @returns React.ReactElement
 */
export default function LoginModal(): React.ReactElement | null {
  const { isShowLoginModal, setIsShowLoginModal, setAuthToken } =
    useGlobalStore();

  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    code: "",
    showCodeForm: false,
    lastSendedEmail: "",
    errorText: "",
  });

  const [loading, setLoading] = useState<LoadingState>({
    sendCode: false,
    login: false,
  });

  const updateFormState = useCallback((updates: Partial<LoginFormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  const setError = useCallback(
    (message: string) => {
      updateFormState({ errorText: message });
    },
    [updateFormState],
  );

  const clearError = useCallback(() => {
    updateFormState({ errorText: "" });
  }, [updateFormState]);

  const handleSendCodeError = useCallback((error: unknown) => {
    if (error instanceof ValidationError) {
      const errors = error.all || [];

      setError(errors.map((message) => message.text).join("\n"));
    } else if (error instanceof BadRequestError) {
      setError(error.message);
    } else {
      setError("Произошла ошибка при отправке кода. Попробуйте еще раз.");
    }
  }, []);

  const handleLoginError = useCallback((error: unknown) => {
    if (error instanceof ValidationError) {
      const errors = error.all || [];

      setError(errors.map((message) => message.text).join("\n"));
    } else if (error instanceof BadRequestError) {
      setError(error.message);
    } else if (error instanceof UnauthorizedError) {
      setError("Неправильный код");
      updateFormState({ code: "" });
    } else {
      setError("Произошла ошибка при входе. Попробуйте еще раз.");
    }
  }, []);

  const handleSendCode = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, sendCode: true }));
      clearError();

      // Отправляем код только если email изменился
      if (formState.email !== formState.lastSendedEmail) {
        await AuthApi.sendCode(formState.email);
        updateFormState({ lastSendedEmail: formState.email });
      }

      updateFormState({
        code: "",
        showCodeForm: true,
      });
    } catch (error) {
      handleSendCodeError(error);
    } finally {
      setLoading((prev) => ({ ...prev, sendCode: false }));
    }
  }, [
    formState.email,
    formState.lastSendedEmail,
    clearError,
    updateFormState,
    handleSendCodeError,
  ]);

  const handleLogin = useCallback(
    async (code: string) => {
      try {
        setLoading((prev) => ({ ...prev, login: true }));
        clearError();

        const response = await AuthApi.login(formState.email, code);

        setAuthToken(response.data.token);

        updateFormState({
          email: "",
          code: "",
          lastSendedEmail: "",
          showCodeForm: false,
        });
        setIsShowLoginModal(false);
      } catch (error) {
        handleLoginError(error);
      } finally {
        setLoading((prev) => ({ ...prev, login: false }));
      }
    },
    [
      formState.email,
      clearError,
      setAuthToken,
      setIsShowLoginModal,
      handleLoginError,
    ],
  );

  const handleBackToEmail = useCallback(() => {
    updateFormState({
      showCodeForm: false,
      errorText: "",
    });
  }, [updateFormState]);

  const handleCloseModal = useCallback(() => {
    setIsShowLoginModal(false);
  }, [setIsShowLoginModal]);

  const handleCodeComplete = useCallback(
    (code: string) => {
      updateFormState({ code });
      handleLogin(code);
    },
    [updateFormState, handleLogin],
  );

  if (!isShowLoginModal) return null;

  return (
    <Modal
      isOpen={isShowLoginModal}
      placement="center"
      onOpenChange={handleCloseModal}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {!formState.showCodeForm ? (
              <EmailForm
                email={formState.email}
                errorText={formState.errorText}
                isLoading={loading.sendCode}
                onClose={onClose}
                onEmailChange={(email) => updateFormState({ email })}
                onError={setError}
                onSuccessSubmit={handleSendCode}
              />
            ) : (
              <CodeForm
                code={formState.code}
                errorText={formState.errorText}
                isLoading={loading.login}
                onBack={handleBackToEmail}
                onCodeComplete={handleCodeComplete}
              />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
