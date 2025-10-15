"use client";

import ProfileInline from "@/components/features/profile/inline";
import { title, subtitle } from "@/components/shared/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="text-center">
        <h1 className={title()}>
          Next.js with{" "}
          <span className={title({ color: "blue" })}>API client</span>
        </h1>

        <p className={subtitle()}>
          Пример использования API в приложении Next.js
        </p>
      </div>

      <div className="mt-3">
        <ProfileInline />
      </div>
    </section>
  );
}
