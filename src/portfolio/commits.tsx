import { useState, useEffect } from 'react';

export default function Commits() {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/commits.json")
      .then((response) => response.json())
      .then((data) => {
        setCommits(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  const committer = commits[0]?.commit.committer.name;
  const committerUrl = commits[0]?.committer?.html_url;

  return (
    <article className="overflow-hidden rounded-[16px] bg-neutral-900 font-sans text-sm font-[450] tracking-[-0.05px] text-neutral-400 shadow-lg">
      <header className="flex items-center gap-3 bg-white/5 px-4 py-3">
        <h3 className="font-semibold text-white">GitHub Activity</h3>
        {committer && (
          <a
            href={committerUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-auto text-white hover:text-neutral-400"
          >
            {committer}
          </a>
        )}
      </header>

      <div className="py-2">
        {commits.length === 0 && (
          <p className="px-4 py-2 text-xs leading-5">No commits.</p>
        )}
        <ul>
          {commits.map((c) => (
            <li key={c.sha}>
              <a
                href={c.html_url}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-10 items-center gap-3 px-4 outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-inset"
              >
				 <span className="shrink-0 font-medium text-white">
                  {c.html_url.split('/')[4]}:
                </span>
                <span className="min-w-0 truncate font-medium" title={c.commit.message}>
                  {c.commit.message.split('\n')[0]}
                </span>
                <span className="ml-auto flex shrink-0 gap-4 font-mono text-xs tabular-nums">
                  <span className="text-emerald-400">
                    +{c.stats?.additions ?? 0}
                  </span>
                  <span className="text-red-400">
                    −{c.stats?.deletions ?? 0}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}


