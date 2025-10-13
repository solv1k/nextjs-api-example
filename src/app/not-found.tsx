import { subtitle, title } from '@/components/shared/primitives'
import Link from 'next/link'
import { button as buttonStyles } from "@heroui/theme";

export default function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 text-center">
            <div className={title()}>🙄 Ooops..</div>
            <h1 className={title()}>Page Not Found</h1>
            <div className={subtitle()}>Could not find requested resource</div>
            <Link
                href="/"
                className={buttonStyles({
                    color: "primary",
                    radius: "full",
                    variant: "shadow",
                })}
            >
                Return Home
            </Link>
        </section>
    )
}