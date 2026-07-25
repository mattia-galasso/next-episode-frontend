import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoading } from "../contexts/LoadingContext";

import bannerPlaceholder from "../assets/img/banner_no_image_available.png";

export default function Hero() {
  const [tvSeries, setTvSeries] = useState();
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  function hero() {
    showLoading();

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/tvseries/homepage?section=hero`)
      .then((res) => {
        setTvSeries(res.data.results);
      })
      .catch((err) => console.log(err))
      .finally(() => hideLoading());
  }

  useEffect(hero, []);

  if (!tvSeries) return;

  let bannerUrl = tvSeries.banner
    ? `${import.meta.env.VITE_API_URL}/storage/${tvSeries.banner}`
    : bannerPlaceholder;

  let imageAltText = tvSeries.title ? tvSeries.title : "No image available";

  // Troncare la descrizione.
  function truncateText(text, maxLength) {
    if (!text) return "";

    if (text.length <= maxLength) {
      return text;
    }

    return `${text.slice(0, maxLength)}...`;
  }

  return (
    <>
      <section className="hero">
        {!bannerLoaded && (
          <div className="hero-banner-skeleton"></div>
        )}

        <img
          src={bannerUrl}
          alt={imageAltText}
          className={`hero-banner ${bannerLoaded ? "loaded" : ""}`}
          onLoad={() => setBannerLoaded(true)}
        />

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-info">
            {bannerLoaded && (
              <>
                <span className="hero-year">
                  {tvSeries.start_year} •{" "}
                  {tvSeries.end_year ? tvSeries.end_year : "In Produzione"}
                </span>

                <h1>{tvSeries.title}</h1>

                <div className="hero-genres">
                  {tvSeries.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </div>

                <p>{truncateText(tvSeries.description, 350)}</p>

                <Link
                  to={`/tvseries/${tvSeries.slug}`}
                  className="btn btn-primary"
                >
                  Scopri di più
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
