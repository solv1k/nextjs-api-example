import { subtitle, title } from '@/components/shared/primitives'
import Link from 'next/link'
import { button as buttonStyles } from "@heroui/theme";

export default function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 text-center">
            <div className={title()}>🙄 Упс.. Такой страницы нет</div>
            <div className={subtitle()}>Попробуйте перейти на главную, там точно будет что-то интересное</div>
            <Link
                href="/"
                className={buttonStyles({
                    color: "primary",
                    radius: "full",
                    variant: "shadow"
                }) + " w-[230px]"}
            >
                Перейти на главную
            </Link>
        </section>
    )
}