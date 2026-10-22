import { useEffect, useState } from "react";

// Large page content (blog posts, sub-services, hotels…) lives in public/content/*.json and is
// fetched when a page opens, so it isn't in the main bundle. Responses are cached for the session.
const contentCache = {};

export const loadContent = (file) => {
  if (!contentCache[file]) {
    contentCache[file] = fetch(`/content/${file}`).then((r) => {
      if (!r.ok) throw new Error(`${file}: ${r.status}`);
      return r.json();
    });
    // a failed request may succeed later (e.g. offline for a moment)
    contentCache[file].catch(() => delete contentCache[file]);
  }
  return contentCache[file];
};

// { data, error, loading } for a content file; `pick` selects the part a page needs (e.g. one entry),
// and `key` (e.g. the slug) re-runs the selection when several pages share one file
export const useContent = (file, pick, key = "") => {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  useEffect(() => {
    let alive = true;
    setState({ data: null, error: null, loading: true });
    loadContent(file)
      .then((json) => alive && setState({ data: pick ? pick(json) : json, error: null, loading: false }))
      .catch((error) => alive && setState({ data: null, error, loading: false }));
    return () => {
      alive = false;
    };
    // `pick` is an inline selector; re-run only when the file or key changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, key]);
  return state;
};
