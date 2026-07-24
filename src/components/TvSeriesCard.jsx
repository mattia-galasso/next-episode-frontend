import { Link } from "react-router";

import posterPlaceholder from "../assets/img/no_image_available.png";

export default function TvSeriesCard({ tvSeries }) {
  let posterUrl = tvSeries.poster
    ? `${import.meta.env.VITE_API_URL}/storage/${tvSeries.poster}`
    : posterPlaceholder;

  let imageAltText = tvSeries.title ? tvSeries.title : "No image available";

  return (
    <Link
      to={`/tvseries/${tvSeries.slug}`}
      className="tv-series-card text-decoration-none"
    >
      <div className="tv-series-card-image">
        <img src={posterUrl} alt={imageAltText} />

        <div className="tv-series-card-overlay">
          <span>Scopri di più</span>
        </div>
      </div>

      <div className="tv-series-card-body">
        <h3>{tvSeries.title}</h3>

        <p>
          {tvSeries.start_year} • {tvSeries.status === 'ongoing' ? 'In Produzione' : 'Terminata'}
        </p>
      </div>
    </Link>
  );
}
