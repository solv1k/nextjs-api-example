"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Пишем ошибку в лог
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Что-то пошло не так!</h2>
      <button
        onClick={
          // Пытаемся повторно отрисовать страницу
          () => reset()
        }
      >
        Попробовать еще раз
      </button>
    </div>
  );
}
