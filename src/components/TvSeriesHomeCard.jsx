import { Link } from "react-router";

import posterPlaceholder from "../assets/img/no_image_available.png";

export default function TvSeriesHomeCard({ tvSeries }) {
  let posterUrl = tvSeries.poster
    ? `${import.meta.env.VITE_API_URL}/storage/${tvSeries.poster}`
    : posterPlaceholder;

  let imageAltText = tvSeries.title ? tvSeries.title : 'No image available'

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
          <img src={posterUrl || posterPlaceholder} alt={tvSeries.title} />

          <div className="tv-series-home-card-content">
            <h3>{truncateTitle(tvSeries.title)}</h3>
            <span>{tvSeries.start_year}</span>
          </div>
        </div>
      </Link>
    </>
  );
}
