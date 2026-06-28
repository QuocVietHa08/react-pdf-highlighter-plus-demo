import { Link } from "react-router";
import { Highlighter, GithubIcon, ArrowRight } from "lucide-react";
import { ThemeToggle } from "~/components/ui/theme-toggle";

const GITHUB_URL = "https://github.com/QuocVietHa08/react-pdf-highlighter-plus";

export interface NavLink {
  label: string;
  to: string;
  /** external links open in a new tab */
  external?: boolean;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Features", to: "/#features" },
  { label: "Docs", to: "/docs" },
  { label: "Changelog", to: "/changelog" },
  { label: "Sponsor", to: "/sponsor" },
];

/**
 * Shared top nav matching the Library.dc.html identity:
 * highlighter.plus logo, design fonts, yellow accent, sticky blur.
 * `left` slot lets pages inject extras (e.g. docs mobile menu / search).
 */
export function SiteNav({
  links = DEFAULT_LINKS,
  left,
  right,
  showTryDemo = true,
}: {
  links?: NavLink[];
  left?: React.ReactNode;
  right?: React.ReactNode;
  showTryDemo?: boolean;
}) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-[1220px] items-center justify-between gap-6 px-4 sm:px-8">
        <div className="flex items-center gap-3">
          {left}
          <Link to="/" className="flex items-center gap-2.5 text-foreground">
            <span className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Highlighter className="h-[17px] w-[17px]" strokeWidth={2.2} />
            </span>
            <span className="font-display text-[15.5px] font-semibold tracking-[-0.01em]">
              highlighter<span className="text-primary">.plus</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-0.5">
          {right}
          <div className="hidden items-center gap-0.5 md:flex">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navlink rounded-lg px-[13px] py-2 text-sm font-medium text-muted-foreground"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.to}
                  className="navlink rounded-lg px-[13px] py-2 text-sm font-medium text-muted-foreground"
                >
                  {l.label}
                </Link>
              )
            )}
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="navlink inline-flex items-center rounded-lg px-[11px] py-2 text-muted-foreground"
            aria-label="GitHub"
          >
            <GithubIcon className="h-[17px] w-[17px]" />
          </a>
          <span className="mx-1.5">
            <ThemeToggle />
          </span>
          {showTryDemo && (
            <Link
              to="/pdf-demo"
              className="inline-flex items-center gap-[7px] rounded-lg bg-primary px-4 py-[9px] text-sm font-semibold text-primary-foreground"
            >
              Try the demo <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
