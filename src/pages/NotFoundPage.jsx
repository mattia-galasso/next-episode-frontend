export default function NotFoundPage() {
  return (
    <section className="container text-center py-5">
      <h1 className="display-1 fw-bold">404</h1>

      <h2 className="mb-3">Pagina non trovata</h2>

      <p className="text-secondary mb-4">
        La pagina che stai cercando non esiste.
      </p>

      <a href="/" className="btn btn-light">
        Torna alla Home
      </a>
    </section>
  );
}