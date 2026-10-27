
import { useEffect, useState } from "react";

export default function CountViews() {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function registerView() {
      try {
        const response = await fetch("/api/view.php", {
          method: "POST",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Server Error");
        }

        const data: { views: number } = await response.json();
        setViews(data.views);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        setError(true);
      }
    }

    registerView();

    return () => controller.abort();
  }, []);

  if (error) {
    return <span></span>;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span>
        {views === null
          ? "0"
          : `${views.toLocaleString("fr-FR")} `
		} Views
      </span>
    </div>
  );
}
