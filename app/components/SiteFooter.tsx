import { Link } from "react-router";
import { Highlighter } from "lucide-react";

const GITHUB_URL = "https://github.com/QuocVietHa08/react-pdf-highlighter-plus";
const NPM_URL = "https://www.npmjs.com/package/react-pdf-highlighter-plus";
const LINKEDIN_URL = "https://www.linkedin.com/in/viethadev/";

/** Shared footer matching the Library.dc.html identity. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1220px] flex-wrap items-center justify-between gap-[18px] p-8">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-primary text-primary-foreground">
            <Highlighter className="h-[15px] w-[15px]" strokeWidth={2.2} />
          </span>
          <span className="text-[13px] text-muted-foreground">
            <span className="font-display font-semibold text-foreground">highlighter.plus</span> ·
            MIT · built by{" "}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-line2 text-foreground/80"
            >
              Edward Ha
            </a>
          </span>
        </div>
        <div className="flex gap-[18px] text-[13.5px]">
          <Link to="/docs" className="text-muted-foreground">
            Docs
          </Link>
          <Link to="/changelog" className="text-muted-foreground">
            Changelog
          </Link>
          <Link to="/sponsor" className="text-muted-foreground">
            Sponsor
          </Link>
          <a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground">
            npm
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
