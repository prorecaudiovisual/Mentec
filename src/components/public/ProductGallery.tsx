"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + total) % total)),
    [total]
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % total)),
    [total]
  );

  // Teclado + trava o scroll da página enquanto o lightbox está aberto
  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close, prev, next]);

  if (total === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Ampliar imagem ${i + 1} de ${total}`}
            className="group relative aspect-square bg-white rounded-xl overflow-hidden border border-[#E0E0E0] hover:border-primary-container/50 hover:shadow-md transition-all duration-200 cursor-zoom-in"
          >
            <Image
              src={src}
              alt={`${productName} — imagem ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>zoom_in</span>
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria de ${productName}`}
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
          onClick={close}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
            touchStartX.current = null;
          }}
        >
          {/* Topo: contador + fechar */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-4 text-white">
            <span className="font-heading text-[10px] uppercase tracking-[0.16em] text-white/60">
              {open + 1} / {total}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar galeria"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Imagem principal */}
          <div className="relative flex-1 min-h-0 mx-4 sm:mx-20">
            <Image
              key={images[open]}
              src={images[open]}
              alt={`${productName} — imagem ${open + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Imagem anterior"
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Próxima imagem"
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              {/* Miniaturas */}
              <div
                className="flex gap-2 justify-center overflow-x-auto px-4 py-4"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-label={`Ver imagem ${i + 1}`}
                    aria-current={i === open}
                    className={`relative w-16 h-16 flex-shrink-0 bg-white rounded-md overflow-hidden border-2 transition-all ${
                      i === open ? "border-primary-container" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
