import { useLoading } from "../contexts/LoadingContext";

import "../assets/css/loading.css";

export default function Loading() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <img src="/logo.png" alt="NextEpisode" className="loading-logo" />
      </div>
    </div>
  );
}
