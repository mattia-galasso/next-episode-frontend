import { useEffect, useState } from "react";
import TvSeriesHomeCard from "./TvSeriesHomeCard";
import axios from "axios";
import { Link } from "react-router";
import { useLoading } from "../contexts/LoadingContext";
import { useNotification } from "../contexts/NotificationContext";

export default function TvSeriesRow({ title, param, to }) {
  const [tvSeries, setTvSeries] = useState();
  const {showLoading, hideLoading} = useLoading();
  const {showNotification} = useNotification();

  function homepageSection() {
    let baseUrl = `${import.meta.env.VITE_API_URL}/api/tvseries/homepage`;

    showLoading();

    axios
      .get(baseUrl + `?section=${param}`)
      .then((res) => {
        setTvSeries(res.data.results);
      })
      .catch((err) => {
        console.log(err.message);
        showNotification("Impossibile recuperare le Serie Tv.", "danger");
      })
      .finally(() => hideLoading());
  }

  useEffect(homepageSection, []);

  if (!tvSeries) return;

  return (
    <>
      <section className="tv-series-row">
        <div className="tv-series-row-header">
          <h2>{title}</h2>

          <Link to={to} className="section-link">
            Vedi tutte
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>

        <div className="homepage-divisor"></div>

        <div className="row g-4">
          {tvSeries.map((tvSeries) => (
            <div key={tvSeries.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
              <TvSeriesHomeCard tvSeries={tvSeries} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
