"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ProductHeroCarouselProps {
  images: string[];
  productName: string;
  /** Tempo de cada imagem na tela, em milissegundos */
  interval?: number;
}

export default function ProductHeroCarousel({
  images,
  productName,
  interval = 4000,
}: ProductHeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = images.length;

  const goTo = useCallback((i: number) => setCurrent((i + total) % total), [total]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);

  // Troca automática; pausa com o mouse em cima ou com a aba em segundo plano
  useEffect(() => {
    if (total < 2 || paused) return;
    const id = setInterval(() => {
      if (!document.hidden) next();
    }, interval);
    return () => clearInterval(id);
  }, [total, paused, interval, next, current]);

  if (total === 0) return null;

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        touchStartX.current = null;
      }}
      aria-roledescription="carrossel"
      aria-label={`Imagens de ${productName}`}
    >
      {images.map((src, i) => (
        <div
          key={src + i}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={src}
            alt={`${productName} — imagem ${i + 1} de ${total}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6 lg:p-12"
            priority={i === 0}
          />
        </div>
      ))}

      {total > 1 && (
        <>
          {/* Setas */}
          <button
            type="button"
            onClick={prev}
            aria-label="Imagem anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 text-black/50 hover:bg-primary-container hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próxima imagem"
            className="absolute right-3 lg:right-[14%] top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 text-black/50 hover:bg-primary-container hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-5 left-1/2 lg:left-[44%] -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ver imagem ${i + 1}`}
                aria-current={i === current}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-primary-container" : "w-3 bg-black/15 hover:bg-black/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
