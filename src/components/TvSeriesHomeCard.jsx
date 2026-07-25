import { Link } from "react-router";

import posterPlaceholder from "../assets/img/no_image_available.png";
import { useState } from "react";

export default function TvSeriesHomeCard({ tvSeries }) {
  const [loaded, setLoaded] = useState(false);

  let posterUrl = tvSeries.poster
    ? `${import.meta.env.VITE_API_URL}/storage/${tvSeries.poster}`
    : posterPlaceholder;

  let imageAltText = tvSeries.title ? tvSeries.title : "No image available";

  // Funzione per troncare il titolo troppo lungo
  function truncateTitle(title, maxLength = 28) {
    if (title.length <= maxLength) {
      return title;
    }
    return `${title.slice(0, maxLength)}...`;
  }

  return (
    <>
      <Link
        to={`/tvseries/${tvSeries.slug}`}
        className="tv-series-home-card text-decoration-none"
      >
        <div className="tv-series-home-card-image">
          {!loaded && <div className="poster-skeleton" />}

          <img
            src={posterUrl || posterPlaceholder}
            alt={tvSeries.title}
            onLoad={() => setLoaded(true)}
            className={loaded ? "poster loaded" : "poster"}
          />

          {loaded && (
            <div className="tv-series-home-card-content">
              <h3>{truncateTitle(tvSeries.title)}</h3>
              <span>{tvSeries.start_year}</span>
            </div>
          )}
        </div>
      </Link>
    </>
  );
}
