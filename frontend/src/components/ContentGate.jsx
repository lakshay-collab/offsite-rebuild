import React from "react";
import NotFound from "@/pages/NotFound";

// Wraps a content-driven page: a quiet blank page for the moment its JSON loads (cached after the first visit), the 404 page if it doesn't exist
const ContentGate = ({ state, children }) => {
  if (state.loading) {
    return (
      <main className="min-h-screen bg-hi-surface" aria-busy="true">
      </main>
    );
  }
  if (state.error || !state.data) return <NotFound />;
  return children(state.data);
};

export default ContentGate;
