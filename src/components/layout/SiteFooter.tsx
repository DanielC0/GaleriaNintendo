export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em]">Galería Nintendo</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
            Proyecto independiente dedicado a explorar la historia de los videojuegos de Nintendo:
            títulos clásicos, lanzamientos recientes y fichas para leer sin prisa.
          </p>
          <p className="mt-3 text-xs text-ink-muted">
            © {new Date().getFullYear()} Galería Nintendo. Hecho con fines educativos.
          </p>
        </div>
        <div className="text-sm leading-relaxed text-ink-muted sm:text-right">
          <p>
            Nintendo es una marca registrada de Nintendo Co., Ltd. Este proyecto no está afiliado
            ni respaldado por Nintendo.
          </p>
          <p className="mt-2">
            Las portadas son composiciones gráficas originales creadas para esta galería; no se
            utilizan imágenes oficiales.
          </p>
        </div>
      </div>
    </footer>
  );
}
