import Hero from "../components/Hero";
import TvSeriesRow from "../components/TvSeriesRow";

// HOMEPAGE CSS
import "../assets/css/homepage.css";

export default function Homeage() {

  return (
    <>
      <Hero />

      <section className="homepage-section">
        <div className="container-custom">

          <TvSeriesRow title="Nuove uscite" param="new_releases" to="/tvseries?newReleases=true" />

          <TvSeriesRow title="In corso" param="ongoing" to="/tvseries?status=ongoing" />

          <TvSeriesRow title="Concluse" param="ended" to="/tvseries?status=ended" />
        </div>
      </section>
    </>
  );
}
