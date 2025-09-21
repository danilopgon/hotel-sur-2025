"use client";

import {useRef, useEffect, useMemo} from "react";
import {Play} from "lucide-react";
import gsap from "gsap";

interface MusicRelease {
    id: string;
    title: string;
    coverUrl: string;
    externalUrl?: string;
    comingSoon?: boolean;
    size: "small" | "medium" | "large";
}

const musicReleases: MusicRelease[] = [
    {
        id: "1",
        title: "Ventolín",
        coverUrl: "/images/ventolin.webp",
        externalUrl: "https://www.youtube.com/watch?v=86mZ53mfDLI",
        size: "large"
    },
    {
        id: "2",
        title: "Crisantemos",
        coverUrl: "/images/crisantemos.webp",
        externalUrl: "https://www.youtube.com/watch?v=in25M1O1oLM",
        size: "medium"
    },
    {
        id: "3",
        title: "Aguas Rojas I",
        coverUrl: "/images/aguas-rojas.webp",
        externalUrl: "https://www.youtube.com/watch?v=yH9zPrDJ3JM",
        size: "medium"
    },
    {
        id: "4",
        title: "Aguas Rojas II (Tras la Tormenta)",
        coverUrl: "/images/tras-la-tormenta.webp",
        externalUrl: "https://www.youtube.com/watch?v=XKvTCaeI5VI",
        size: "small"
    },
    {
        id: "5",
        title: "En cualquier lugar",
        coverUrl: "/images/en-cualquier-lugar.webp",
        comingSoon: true,
        size: "small"
    },
];

function sizeToGridClasses(size: MusicRelease["size"]) {
    switch (size) {
        case "large":
            return "h-96 md:h-auto md:col-span-2 md:row-span-2";
        case "medium":
            return "h-96 md:h-auto md:col-span-2 md:row-span-1";
        case "small":
        default:
            return "h-96 md:h-auto md:col-span-2 md:row-span-1";
    }
}

type CardProps = { release: MusicRelease };

function ReleaseCard({release}: CardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const imgRef = useRef<HTMLDivElement | null>(null);

    const reducedMotion = useMemo(
        () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
        []
    );

    useEffect(() => {
        if (!cardRef.current || !imgRef.current) return;
        const ctx = gsap.context(() => {
            gsap.set(imgRef.current, {scale: 1.02, xPercent: 0, yPercent: 0});

            if (reducedMotion) return;

            const enter = () => {
                gsap.to(imgRef.current, {
                    scale: 1.08,
                    xPercent: 2, // leve paneo
                    yPercent: -2,
                    duration: 0.6,
                    ease: "power3.out",
                });
            };

            const leave = () => {
                gsap.to(imgRef.current, {
                    scale: 1.02,
                    xPercent: 0,
                    yPercent: 0,
                    duration: 0.6,
                    ease: "power3.out",
                });
            };

            const el = cardRef.current!;
            el.addEventListener("mouseenter", enter);
            el.addEventListener("mouseleave", leave);
            el.addEventListener("focusin", enter);   // accesible con tab
            el.addEventListener("focusout", leave);

            return () => {
                el.removeEventListener("mouseenter", enter);
                el.removeEventListener("mouseleave", leave);
                el.removeEventListener("focusin", enter);
                el.removeEventListener("focusout", leave);
            };
        }, cardRef);

        return () => ctx.revert();
    }, [reducedMotion]);

    const content = (
        <div
            ref={cardRef}
            className={[
                "relative overflow-hidden rounded-xl group isolate",
                "ring-1 ring-white/5 hover:ring-white/10 transition-shadow",
                !release.comingSoon ? "cursor-pointer hover:shadow-xl" : "cursor-default",
                sizeToGridClasses(release.size),
            ].join(" ")}
            aria-label={release.title}
            aria-disabled={release.comingSoon ? true : undefined}
            tabIndex={0}
        >
            <div
                ref={imgRef}
                className="absolute inset-0 bg-cover bg-center will-change-transform"
                style={{backgroundImage: `url(${release.coverUrl})`}}
            />

            <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/0 pointer-events-none"/>

            {release.comingSoon && (
                <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] grid place-items-center">
          <span className="text-white text-base md:text-lg font-semibold bg-primary/25 px-4 py-2 rounded-full">
            Próximamente
          </span>
                </div>
            )}

            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <h3
                    className={[
                        "font-bold text-white text-balance uppercase",
                        release.size === "large" ? "text-2xl md:text-3xl" : release.size === "medium" ? "text-xl" : "text-lg",
                    ].join(" ")}
                >
                    {release.title}
                </h3>

                {!release.comingSoon && (
                    <div
                        className="mt-3 inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-primary/30 transition-colors w-fit">
                        <Play className="w-4 h-4 md:w-5 md:h-5 text-primary fill-current"/>
                        <span className="sr-only">Reproducir {release.title}</span>
                    </div>
                )}
            </div>
        </div>
    );

    return !release.comingSoon && release.externalUrl ? (
        <a
            href={release.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contents"
            onClick={(e) => e.stopPropagation()}
        >
            {content}
        </a>
    ) : (
        content
    );
}

export default function Releases() {
    return (
        <section aria-labelledby="releases-title" className="relative min-h-screen">
            <div className="absolute inset-0 bg-neutral-900"/>
            <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-6 py-12 md:p-12">
                <h2 id="releases-title"
                    className="text-3xl md:text-6xl font-bold text-neutral-50 mb-8 pb-2 uppercase tracking-tight">
                    Singles de &#34;Sobre La Gravedad&#34;
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:auto-rows-[200px]">
                    {musicReleases.map((r) => (
                        <ReleaseCard key={r.id} release={r}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
