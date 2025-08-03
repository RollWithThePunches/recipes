import contentData from "@/data/content.json";
import { ContentData } from "@/types/content";
import Heading from "@/components/ui/heading";
import Link from "@/components/ui/link";
import Text from "@/components/ui/text";

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
            <Heading as="h2" size="3xl" font="heading" className="text-white leading-none">
              {content.ui.footer.brand}
            </Heading>
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
                <Link
                  key={index}
                  href={link.href}
                  variant="body"
                  size="sm"
                  underline
                  color="on-dark"
                  className="hover:text-[var(--color-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Copyright */}
            <div className="text-sm">
              <Text
                size="sm"
                color="on-dark"
                lineHeight="normal"
              >
                {content.ui.footer.copyright}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
