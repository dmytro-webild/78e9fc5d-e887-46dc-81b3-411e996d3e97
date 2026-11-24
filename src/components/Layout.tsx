import { Outlet } from "react-router-dom";
import NavbarTabStrip from "@/components/navbars/NavbarTabStrip";
import FooterRulerIndex from "@/components/sections/footer/FooterRulerIndex";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="solid" data-card="outline" data-pattern="grid">
      <header data-webild-section="Header">
        <NavbarTabStrip
          brand="Dev3D Studio"
          navItems={[
            {
              name: "Home",
              href: "#hero"
            },
            {
              name: "About",
              href: "#about"
            },
            {
              name: "Services",
              href: "#services"
            },
            {
              name: "Results",
              href: "#metrics"
            },
            {
              name: "Reviews",
              href: "#testimonial"
            },
            {
              name: "FAQ",
              href: "#faq"
            }
          ]}
          primaryButton={{
            text: "Start Project",
            href: "#contact"
          }}
          introDelay={1.6}
        />
      </header>
      <main className="flex-grow" data-button="solid" data-card="outline" data-pattern="grid">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterRulerIndex
          wordmark="Dev3D Studio"
          columns={[
            {
              title: "Navigation",
              links: [
                {
                  text: "Home",
                  href: "#hero"
                },
                {
                  text: "About",
                  href: "#about"
                },
                {
                  text: "Services",
                  href: "#services"
                },
                {
                  text: "Metrics",
                  href: "#metrics"
                },
                {
                  text: "Testimonials",
                  href: "#testimonial"
                },
                {
                  text: "Contact",
                  href: "#contact"
                }
              ]
            },
            {
              title: "Enquiries",
              links: [
                {
                  text: "makcodebros@gmail.com",
                  href: "mailto:makcodebros@gmail.com"
                },
                {
                  text: "7356743300",
                  href: "tel:7356743300"
                }
              ]
            },
            {
              title: "Connect",
              links: [
                {
                  text: "LinkedIn",
                  href: "#"
                },
                {
                  text: "Twitter",
                  href: "#"
                },
                {
                  text: "Instagram",
                  href: "#"
                },
                {
                  text: "GitHub",
                  href: "#"
                }
              ]
            }
          ]}
          city="Austin"
          timeZone="America/Chicago"
          copyright="© 2026 Dev3D Studio. All rights reserved."
          backToTop="Back to top"
        />
      </footer>
    </div>
  );
}
