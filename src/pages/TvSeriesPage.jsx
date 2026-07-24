import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";

// TVSERIES CSS
import "../assets/css/tvseries.css";

import TvSeriesCard from "../components/TvSeriesCard";

export default function TvSeriesPage() {
  const [tvSeries, setTvSeries] = useState();
  const [platformList, setPlatformList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  // Query Params
  const [searchParams, setSearchParams] = useSearchParams();

  const order = searchParams.get("order") || "";
  const status = searchParams.get("status") || "";
  const newReleases = searchParams.get("newReleases") === "true";

  const platforms = searchParams.getAll("platforms[]");
  const genres = searchParams.getAll("genres[]");

  // PAGINAZIONE
  const page = searchParams.get("page") || 1;

  // SEARCH
  const search = searchParams.get("search") || "";

  // Const Labels
  const statusLabel =
    status === "ongoing"
      ? "In corso"
      : status === "ended"
        ? "Concluse"
        : "Stato";

  const orderLabel =
    order === "az"
      ? "A-Z"
      : order === "za"
        ? "Z-A"
        : order === "recent"
          ? "Più recenti"
          : order === "old"
            ? "Meno recenti"
            : "Ordinamento";

  const platformLabel =
    platforms.length > 0 ? `Piattaforme (${platforms.length})` : "Piattaforme";

  const genreLabel = genres.length > 0 ? `Generi (${genres.length})` : "Generi";

  // Const x button azzera filtri
  const hasFilters =
    search ||
    order ||
    status ||
    newReleases ||
    platforms.length > 0 ||
    genres.length > 0;

  /**
   * Aggiorna il valore di una Query Param.
   *
   * @param {string} key Chiave del parametro (es. "status", "order").
   * @param {string} value Valore da assegnare al parametro.
   */
  function updateSearchParam(key, value) {
    setSearchParams((searchParams) => {
      searchParams.set(key, value);
      searchParams.set("page", 1);

      return searchParams;
    });
  }

  /**
   * Attiva o disattiva una Query Param booleana.
   * Se il parametro esiste lo rimuove, altrimenti lo imposta a "true".
   *
   * @param {string} key Chiave del parametro (es. "newReleases").
   */
  function toggleSearchParam(key) {
    setSearchParams((searchParams) => {
      if (searchParams.has(key)) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, "true");
      }

      searchParams.set("page", 1);

      return searchParams;
    });
  }

  /**
   * Aggiorna un filtro con selezione multipla (piattaforme o generi).
   * Se il valore è già presente lo rimuove, altrimenti lo aggiunge.
   *
   * @param {string} key Chiave del parametro (es. "platforms", "genres").
   * @param {string} value Valore da aggiungere o rimuovere.
   */
  function updateMultiSearchParam(key, value) {
    setSearchParams((searchParams) => {
      if (searchParams.has(key, value)) {
        searchParams.delete(key, value);
      } else {
        searchParams.append(key, value);
      }

      searchParams.set("page", 1);

      return searchParams;
    });
  }

  function updatePage(page) {
    setSearchParams((searchParams) => {
      searchParams.set("page", page);

      return searchParams;
    });
  }

  //Lista Serie TV
  function getTvSeries() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/tvseries`, {
        params: {
          page,
          search,
          order,
          status,
          newReleases,
          platforms,
          genres,
        },
      })
      .then((res) => {
        setTvSeries(res.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // Lista Piattaforme x Filtro
  function getPlatforms() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/platforms`)
      .then((res) => {
        setPlatformList(res.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // Lista Generi x Filtro
  function getGenres() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/genres`)
      .then((res) => setGenreList(res.data.results))
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    getPlatforms();
    getGenres();
  }, []);

  useEffect(getTvSeries, [searchParams]);

  if (!tvSeries) return;

  // PAGINAZIONE
  const pages = [];

  for (let i = 1; i <= tvSeries.last_page; i++) {
    pages.push(i);
  }

  return (
    <>
      <section className="tv-series-page">
        <div className="container-custom">
          {/* Header */}

          <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4">
            <div>
              <h1 className="mb-1">
                {search ? `Risultati per "${search}"` : "Serie TV"}
              </h1>

              <p className="text-secondary mb-0">{tvSeries.total} risultati</p>
            </div>
          </div>

          {/* FILTRI */}

          <div className="tv-series-toolbar d-flex justify-content-end flex-wrap gap-2 mb-4">
            {/* NUOVE USCITE */}
            <button
              className={`btn ${newReleases ? "btn-light text-dark" : "btn-outline-light"}`}
              onClick={() => toggleSearchParam("newReleases")}
            >
              Nuove uscite
            </button>

            {/* ORDINAMENTO */}
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                {orderLabel}
              </button>

              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => updateSearchParam("order", "az")}
                  >
                    Dalla A alla Z
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => updateSearchParam("order", "za")}
                  >
                    Dalla Z alla A
                  </button>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => updateSearchParam("order", "recent")}
                  >
                    Più recenti
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => updateSearchParam("order", "old")}
                  >
                    Meno recenti
                  </button>
                </li>
              </ul>
            </div>

            {/* STATO */}
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                {statusLabel}
              </button>

              <div className="dropdown-menu dropdown-menu-dark p-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    id="all"
                    checked={status === ""}
                    onChange={() => updateSearchParam("status", "")}
                  />

                  <label className="form-check-label" htmlFor="all">
                    Tutte
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    id="ongoing"
                    checked={status === "ongoing"}
                    onChange={() => updateSearchParam("status", "ongoing")}
                  />

                  <label className="form-check-label" htmlFor="ongoing">
                    In corso
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    id="ended"
                    checked={status === "ended"}
                    onChange={() => updateSearchParam("status", "ended")}
                  />

                  <label className="form-check-label" htmlFor="ended">
                    Concluse
                  </label>
                </div>
              </div>
            </div>

            {/* PIATTAFORME */}
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                {platformLabel}
              </button>

              <div className="dropdown-menu dropdown-menu-dark p-3 filter-dropdown">
                <div className="d-flex flex-wrap gap-2">
                  {platformList.map((platform) => (
                    <button
                      key={platform.id}
                      type="button"
                      className={`btn btn-sm ${platforms.includes(String(platform.id)) ? "btn-light text-dark" : "btn-outline-secondary"}`}
                      onClick={() =>
                        updateMultiSearchParam(
                          "platforms[]",
                          String(platform.id),
                        )
                      }
                    >
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* GENERI */}
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                {genreLabel}
              </button>

              <div className="dropdown-menu dropdown-menu-dark p-3 filter-dropdown">
                <div className="d-flex flex-wrap gap-2">
                  {genreList.map((genre) => (
                    <button
                      key={genre.id}
                      type="button"
                      className={`btn btn-sm ${genres.includes(String(genre.id)) ? "btn-light text-dark" : "btn-outline-secondary"}`}
                      onClick={() =>
                        updateMultiSearchParam("genres[]", String(genre.id))
                      }
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {hasFilters && (
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  setSearchParams({});
                  setSearch("");
                }}
              >
                <i className="bi bi-x-circle me-2"></i>
                Azzera filtri
              </button>
            )}
          </div>

          {/* CARDS */}

          {tvSeries.data.length > 0 ? (
            <div className="row g-4">
              {tvSeries.data.map((tvSeries) => (
                <div
                  key={tvSeries.id}
                  className="col-6 col-md-4 col-lg-3 col-xl-2"
                >
                  <TvSeriesCard tvSeries={tvSeries} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h3 className="mb-3">Nessuna serie TV trovata</h3>

              <p className="text-secondary">
                Prova a modificare o rimuovere alcuni filtri.
              </p>

              <button
                className="btn btn-outline-light mt-2"
                onClick={() => {
                  setSearchParams({});
                  setSearch("");
                }}
              >
                Azzera filtri
              </button>
            </div>
          )}

          {/* PAGINAZIONE */}

          <div className="d-flex justify-content-center mt-5 gap-2">
            {pages.map((page) => (
              <button
                key={page}
                className={`btn ${
                  page === tvSeries.current_page
                    ? "btn-light"
                    : "btn-outline-light"
                }`}
                onClick={() => updatePage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
