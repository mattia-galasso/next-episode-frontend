import { BrowserRouter, Route, Routes } from "react-router";

/* LAYOUT */
import DefaultLayout from "./layouts/DefaultLayout";

/* PAGES */
import Homepage from "./pages/Homepage";
import TvSeriesPage from "./pages/TvSeriesPage";
import TvSeriesDetailPage from "./pages/TvSeriesDetailPage";
import ActorDetailPage from "./pages/ActorDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

/* Loading Context */
import { LoadingProvider } from "./contexts/LoadingContext";

/* Notification Context */
import { NotificationProvider } from "./contexts/NotificationContext";
import { SearchProvider } from "./contexts/SearchContext";

export default function App() {
  return (
    <>
      <LoadingProvider>
        <NotificationProvider>
          <SearchProvider>
            <BrowserRouter>
              <Routes>
                <Route Component={DefaultLayout}>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/tvseries" element={<TvSeriesPage />} />
                  <Route
                    path="/tvseries/:slug"
                    element={<TvSeriesDetailPage />}
                  />
                  <Route path="/actors/:slug" element={<ActorDetailPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </SearchProvider>
        </NotificationProvider>
      </LoadingProvider>
    </>
  );
}