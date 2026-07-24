import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";

import "../assets/css/detail.css";

export default function TvSeriesDetailPage() {
  const { slug } = useParams();

  const [tvSeries, setTvSeries] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/tvseries/${slug}`)
      .then((res) => {
        setTvSeries(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [slug]);

  if (!tvSeries) return null;

  const creators = tvSeries.actors.filter(
    (actor) => actor.pivot.role === "Creatore",
  );

  let posterUrl = tvSeries.poster
    ? `${import.meta.env.VITE_API_URL}/storage/${tvSeries.poster}`
    : posterPlaceholder;

  let bannerUrl = tvSeries.banner
    ? `${import.meta.env.VITE_API_URL}/storage/${tvSeries.banner}`
    : bannerPlaceholder;

  let imageAltText = tvSeries.title ? tvSeries.title : "No image available";

  const statusLabel =
    tvSeries.status === "ongoing" ? "In Produzione" : "Terminata";

  const seasonLabel =
    tvSeries.season_count === 1
      ? "1 stagione"
      : `${tvSeries.season_count} stagioni`;

  return (
    <>
      <div
        className="detail-page"
        style={{
          "--banner-image": `url(${bannerUrl})`,
        }}
      >
        <div className="detail-overlay">
          <section className="detail-hero-banner">
            <div className="container pt-5">
              <div className="row align-items-center g-5">
                {/* Poster */}

                <div className="col-lg-3">
                  <img
                    src={posterUrl}
                    alt={imageAltText}
                    className="img-fluid shadow poster"
                  />
                </div>

                {/* Informazioni */}

                <div className="col-lg-9 text-white">
                  <h1 className="display-4 fw-bold">{tvSeries.title}</h1>

                  <p className="text-secondary fs-5">
                    {tvSeries.start_year}
                    {tvSeries.end_year && ` - ${tvSeries.end_year}`}
                    {" • "}
                    {statusLabel}
                    {" • "}
                    {tvSeries.age_rating}
                    {" • "}
                    {seasonLabel}
                  </p>

                  <div className="mb-4">
                    {tvSeries.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="badge me-2 mb-2 genre-badge"
                        style={{ "--genre-color": genre.color }}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  <p className="lead">{tvSeries.description}</p>

                  <hr />

                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Creato da:</strong>{" "}
                        {creators.length > 0
                          ? creators.map((creator) => creator.name).join(", ")
                          : "Non disponibile"}
                      </p>

                      <p>
                        <strong>Lingua originale:</strong>{" "}
                        {tvSeries.original_language}
                      </p>

                      <p>
                        <strong>Paese:</strong> {tvSeries.country}
                      </p>
                    </div>

                    <div className="col-md-6">
                      <p>
                        <strong>Casa di produzione:</strong>{" "}
                        {tvSeries.production_company?.name || "Non disponibile"}
                      </p>

                      <p>
                        <strong>Stato:</strong> {statusLabel}
                      </p>

                      <p>
                        <strong>Classificazione:</strong> {tvSeries.age_rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TRAILER E PLATFORMS */}
          <section className="detail-content">
            <div className="container  py-5">
              <div className="row g-4">
                {/* Trailer */}

                <div className="col-lg-8">
                  <div className="detail-card">
                    <h2 className="section-title mb-4">Trailer</h2>

                    {tvSeries.trailer_youtube_id ? (
                      <div className="trailer-body d-flex justify-content-center align-item-center">
                        <iframe
                          src={`https://www.youtube.com/embed/${tvSeries.trailer_youtube_id}?controls=0`}
                          title={`Trailer ${tvSeries.title}`}
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <p className="text-secondary">Trailer non disponibile.</p>
                    )}
                  </div>
                </div>

                {/* Dove guardarla */}

                <div className="col-lg-4">
                  <div className="detail-card">
                    <h2 className="section-title mb-4">Dove guardarla</h2>

                    {tvSeries.platforms.length > 0 ? (
                      tvSeries.platforms.map((platform) => {
                        let platformLogo;
                        let platformUrl;

                        if (!platform.logo_img) {
                          platformLogo = `${import.meta.env.VITE_API_URL}/img/no_image_available.png`;
                        } else if (platform.logo_img.startsWith("logo_")) {
                          platformLogo = `${import.meta.env.VITE_API_URL}/img/platforms/${platform.logo_img}`;
                        } else {
                          platformLogo = `${import.meta.env.VITE_API_URL}/storage/${platform.logo_img}`;
                        }

                        if (platform.pivot && platform.pivot.url) {
                          platformUrl = platform.pivot.url;
                        } else {
                          platformUrl = platform.website;
                        }

                        return (
                          <>
                            <a
                              key={platform.id}
                              href={platformUrl}
                              target="_blank"
                              className="platform-item"
                            >
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={platformLogo}
                                  alt={platform.name}
                                  className="platform-logo"
                                />

                                <span>{platform.name}</span>
                              </div>
                            </a>
                          </>
                        );
                      })
                    ) : (
                      <p className="text-secondary">
                        Nessuna piattaforma disponibile.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CAST */}
          <section className="cast-section">
            <div className="container">
              <div className="cast-content">
                <h2 className="section-title mb-4">Cast</h2>

                <div className="row g-4">
                  {tvSeries.actors.length > 0 ? (
                    tvSeries.actors.map((actor) => {
                      let actorPhoto;

                      if (!actor.photo) {
                        actorPhoto = `${import.meta.env.VITE_API_URL}/img/no_image_available.png`;
                      } else {
                        actorPhoto = `${import.meta.env.VITE_API_URL}/storage/${actor.photo}`;
                      }

                      return (
                        <div
                          key={actor.id}
                          className="col-6 col-sm-4 col-md-3 col-lg-2"
                        >
                          <Link
                            to={`/actors/${actor.slug}`}
                            className="text-decoration-none"
                          >
                            <div className="cast-card">
                              <img
                                src={actorPhoto}
                                alt={actor.name}
                                className="cast-photo"
                              />

                              <div className="cast-body">
                                <h6 className="cast-name">{actor.name}</h6>

                                <small className="cast-role">
                                  {actor.pivot.role}
                                </small>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-secondary">Nessun attore disponibile.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
