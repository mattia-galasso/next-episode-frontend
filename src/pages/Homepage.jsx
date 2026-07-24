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

          <TvSeriesRow title="Nuove uscite" param="new_releases" />

          <TvSeriesRow title="In corso" param="ongoing" />

          <TvSeriesRow title="Concluse" param="ended" />
        </div>
      </section>
    </>
  );
}
