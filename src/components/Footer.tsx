import contentData from "@/data/content.json";
import { ContentData } from "@/types/content";

const content = contentData as ContentData;

export default function Footer() {
  return (
    <footer
      className="relative w-full bg-[var(--color-background-dark)]"
      role="contentinfo"
    >
      <div className="flex flex-row items-center w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-6 w-full gap-4 md:gap-0">
          {/* Left section - Brand */}
          <div className="flex flex-row items-center">
            <h2
              className="text-[32px] text-white leading-none"
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: "var(--font-size-3xl)",
              }}
            >
              {content.ui.footer.brand}
            </h2>
          </div>

          {/* Right section - Navigation links and copyright */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full md:w-[532px] gap-4 md:gap-0 md:h-[30px]">
            {/* Footer navigation links */}
            <nav
              className="flex flex-col md:flex-row gap-4 md:gap-6 items-start"
              role="navigation"
              aria-label="Footer navigation"
            >
              {content.ui.footer.links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white text-sm underline hover:text-[var(--color-primary)] transition-colors"
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "normal",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <div className="text-sm">
              <p
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "normal",
                  color: "var(--color-text-on-dark)",
                }}
              >
                {content.ui.footer.copyright}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
