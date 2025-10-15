"use client";

import {
  useState,
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
  useEffect,
} from "react";

interface CodeInputProps {
  onComplete?: (code: string) => void;
  onChange?: (code: string) => void;
  value?: string;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Code input
 *
 * @param props
 * @returns React.ReactElement
 */
export default function CodeInput({
  onComplete,
  onChange,
  value = "",
  length = 6,
  disabled = false,
  autoFocus = true,
  className = "",
  style,
}: CodeInputProps): React.ReactElement {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value.length !== length) {
      setCode(Array(length).fill(""));

      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  }, [value]);

  // Автофокус на первое поле при монтировании
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    // Разрешаем только цифры
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];

    newCode[index] = value;
    setCode(newCode);

    const fullCode = newCode.join("");

    onChange?.(fullCode);

    if (fullCode.length === length && onComplete) {
      onComplete(fullCode);
    }

    // Автоматически переходим к следующему полю
    if (value && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Обработка Backspace
    if (e.key === "Backspace") {
      e.preventDefault();

      if (!code[index] && index > 0) {
        // Если поле пустое, переходим к предыдущему и удаляем его значение
        const newCode = [...code];

        newCode[index - 1] = "";
        setCode(newCode);
        focusInput(index - 1);
      } else if (code[index]) {
        // Если в поле есть значение, просто очищаем его
        const newCode = [...code];

        newCode[index] = "";
        setCode(newCode);
      }
    }

    // Обработка стрелок
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }

    // Обработка Delete
    if (e.key === "Delete") {
      e.preventDefault();
      const newCode = [...code];

      newCode[index] = "";
      setCode(newCode);
    }

    // Обработка Tab - нормальное поведение
    if (e.key === "Tab") {
      // Позволяем стандартное поведение Tab
      return;
    }

    // Блокируем ввод нецифровых символов (кроме управляющих клавиш)
    if (
      !/^(?:Backspace|Delete|Tab|ArrowLeft|ArrowRight|Enter|Escape)$/.test(
        e.key,
      ) &&
      !/^\d$/.test(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const numbers = pastedData.replace(/\D/g, "").slice(0, length);

    if (numbers.length > 0) {
      const newCode = Array(length).fill("");

      numbers.split("").forEach((num, index) => {
        if (index < length) {
          newCode[index] = num;
        }
      });
      setCode(newCode);

      // Проверяем, заполнен ли весь код
      const fullCode = newCode.join("");

      if (fullCode.length === length && onComplete) {
        onComplete(fullCode);
      }

      // Фокусируемся на последнем заполненном поле
      const lastFilledIndex = Math.min(numbers.length - 1, length - 1);

      focusInput(lastFilledIndex);
    }
  };

  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    // Выделяем весь текст при фокусе
    e.target.select();
  };

  const getInputClassName = () => {
    let classes = [
      "w-10 h-10 text-base",
      "text-center text-xl font-semibold",
      "border-2 border-slate-300 rounded-lg",
      "bg-white dark:bg-[#353535]",
      "transition-all duration-200 ease-in-out",
      "font-mono",
      "focus:border-blue-500 focus:outline-none focus:ring-3 focus:ring-blue-500/25 focus:scale-105",
      "hover:enabled:border-slate-400",
      "disabled:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400",
      "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
      "sm:w-11 sm:h-11 sm:text-lg",
    ];

    return classes.join(" ");
  };

  const getContainerClassName = () => {
    const baseClasses = [
      "flex items-center justify-center gap-3 w-full", // 12px gap на десктопе
      "sm:gap-2", // 8px gap на мобильных
      "gap-1.5", // 6px gap на очень маленьких экранах
    ];

    return `${baseClasses.join(" ")} ${className}`.trim();
  };

  return (
    <div className={getContainerClassName()} style={style}>
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          aria-label={`Number ${index + 1} of ${length}`}
          autoComplete="one-time-code"
          className={getInputClassName()}
          disabled={disabled}
          inputMode="numeric"
          maxLength={1}
          pattern="[0-9]*"
          type="text"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onFocus={handleFocus}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}
