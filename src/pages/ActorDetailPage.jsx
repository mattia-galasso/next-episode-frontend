import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import { useLoading } from "../contexts/LoadingContext";
import { useNotification } from "../contexts/NotificationContext";


import "../assets/css/actor-detail.css";

export default function ActorDetailPage() {
  const { slug } = useParams();
  const [actor, setActor] = useState(null);
  const {showLoading, hideLoading} = useLoading();
  const {showNotification} = useNotification();

  useEffect(() => {
    showLoading();

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/actors/${slug}`)
      .then((res) => {
        setActor(res.data.results);
      })
      .catch((err) => {
        console.error(err);
        showNotification("Impossibile recuperare informazioni Attore.", "danger");
      })
      .finally(() => hideLoading());
  }, [slug]);

  if (!actor) return null;

  let actorPhoto = actor.photo
    ? `${import.meta.env.VITE_API_URL}/storage/${actor.photo}`
    : `${import.meta.env.VITE_API_URL}/img/no_image_available.png`;

  let biography = actor.biography
    ? actor.biography
    : "Al momento non è disponibile una biografia per questo attore.";

  return (
    <>
      <div
        className="actor-detail-page"
        style={{
          "--actor-background": `url(${actorPhoto})`,
        }}
      >
        <div className="actor-overlay">
          <section className="actor-hero">
            <div className="container py-5">
              <div className="row align-items-center g-5">
                <div className="col-lg-4 text-center">
                  <img
                    src={actorPhoto}
                    alt={actor.name}
                    className="actor-photo"
                  />
                </div>

                <div className="col-lg-8 text-white">
                  <h1 className="display-3 fw-bold">{actor.name}</h1>

                  <p className="text-secondary fs-5 mb-4">
                    {actor.birth_date_formatted}
                    {" • "}
                    {actor.age} anni
                  </p>

                  <div className="detail-card">
                    <h2 className="section-title mb-3">Biografia</h2>

                    <p className="lead mb-0">{biography}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="filmography-section">
            <div className="container pb-5">
              <div className="detail-card">
                <h2 className="section-title mb-4">Serie TV</h2>

                {actor.tv_series.length > 0 ? (
                  actor.tv_series.map((tvSeries) => {
                    let posterUrl = tvSeries.poster
                      ? `${import.meta.env.VITE_API_URL}/storage/${tvSeries.poster}`
                      : `${import.meta.env.VITE_API_URL}/img/no_image_available.png`;

                    let statusLabel =
                      tvSeries.status === "ongoing"
                        ? "In Produzione"
                        : "Terminata";

                    let seasonLabel =
                      tvSeries.season_count === 1
                        ? "1 stagione"
                        : `${tvSeries.season_count} stagioni`;

                    return (
                      <>
                        <Link
                          key={tvSeries.id}
                          to={`/tvseries/${tvSeries.slug}`}
                          className="series-link"
                        >
                          <div className="actor-series-card">
                            <img
                              src={posterUrl}
                              alt={tvSeries.title}
                              className="actor-series-poster"
                            />

                            <div className="actor-series-body">
                              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                                <div>
                                  <h3 className="actor-series-title">
                                    {tvSeries.title}
                                  </h3>

                                  <p className="actor-role">
                                    {tvSeries.pivot.role === "Creatore"
                                      ? "Creatore della serie"
                                      : `Nel ruolo di ${tvSeries.pivot.role}`}
                                  </p>

                                  <div className="actor-meta">
                                    <span>{tvSeries.start_year}</span>

                                    {tvSeries.end_year && (
                                      <>
                                        <span> - </span>
                                        <span>{tvSeries.end_year}</span>
                                      </>
                                    )}

                                    <span> • </span>

                                    <span>{statusLabel}</span>

                                    <span> • </span>

                                    <span>{seasonLabel}</span>

                                    <span> • </span>

                                    <span>{tvSeries.age_rating}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4">
                                {tvSeries.genres.map((genre) => (
                                  <span
                                    key={genre.id}
                                    className="badge me-2 mb-2 genre-badge"
                                    style={{
                                      "--genre-color": genre.color,
                                    }}
                                  >
                                    {genre.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </>
                    );
                  })
                ) : (
                  <p className="text-secondary">
                    Nessuna serie TV disponibile.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
