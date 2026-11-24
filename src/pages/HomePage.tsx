import HeroCanvasName from "@/components/sections/hero/HeroCanvasName";
import AboutWhatsUp from "@/components/sections/about/AboutWhatsUp";
import ServicesCanvasBoard from "@/components/sections/features/ServicesCanvasBoard";
import MetricsPhotoHold from "@/components/sections/metrics/MetricsPhotoHold";
import TestimonialCommentCards from "@/components/sections/testimonial/TestimonialCommentCards";
import FaqCommentThreads from "@/components/sections/faq/FaqCommentThreads";
import ContactFramedWindow from "@/components/sections/contact/ContactFramedWindow";
import LoaderTypingBubble from "@/components/loaders/LoaderTypingBubble";

export default function HomePage() {
  return (
    <>
      <LoaderTypingBubble
        word="Welcome!"
      />

      <div id="hero" data-webild-section="HeroCanvasName" data-webild-section-id="HeroCanvasName-1" data-section="hero" data-scene>
        <HeroCanvasName
          note="we are"
          title="Mackcode"
          notes={[
            "Interactive sites",
            "High performance"
          ]}
          status="Booking Q2 local projects"
          description="We build fast interactive web experiences for local businesses."
          primaryButton={{
            text: "View work",
            href: "#contact"
          }}
          tags={[
            "Mackcode Studio",
            "Austin, TX"
          ]}
          avatars={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/stockholder-working-from-home-using-mockup-device_482257-121841.jpg",
              imageAlt: "woman working on a tablet"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/black-programmer-remotely-working-home-office-writing-code-computer_482257-118283.jpg",
              imageAlt: "man working on computer code"
            }
          ]}
          timeZone="America/Chicago"
          introDelay={1.6}
        />
      </div>

      <div id="about" data-webild-section="AboutWhatsUp" data-webild-section-id="AboutWhatsUp-1" data-section="about">
        <AboutWhatsUp
          note="our vision"
          label="who we are"
          title="We bring {0} high-end interactive web design to local businesses {1} looking to stand out {2}."
          inlineImages={[
            {
              src: "https://img.b2bpic.net/free-photo/working-place-designer-closeup_93675-132272.jpg",
              alt: "Working place of designer closeup"
            },
            {
              src: "https://img.b2bpic.net/free-photo/desk-office-with-objects_23-2147982288.jpg",
              alt: "Desk office with objects"
            },
            {
              src: "https://img.b2bpic.net/free-photo/modern-minimalist-office-black-white_23-2151777555.jpg",
              alt: "Modern and minimalist office in black and white"
            }
          ]}
          items={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/software-engineer-writes-complex-binary-code-scripts-computer_482257-83077.jpg",
              imageAlt: "Software engineer writes complex binary code scripts on computer",
              caption: "founded 2022"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/medium-shot-people-looking-laptop_23-2149358482.jpg",
              imageAlt: "Medium shot people looking at laptop",
              caption: "austin studio"
            }
          ]}
          skills={[
            "3D Web Design",
            "Interactive Layouts",
            "Local SEO & Speed",
            "Custom Web Apps"
          ]}
        />
      </div>

      <div id="services" data-webild-section="ServicesCanvasBoard" data-webild-section-id="ServicesCanvasBoard-1" data-section="services">
        <ServicesCanvasBoard
          title="Built for growth"
          items={[
            {
              title: "Interactive 3D",
              description: "Engaging layouts with 3D depth and movement built for high conversion.",
              tags: [
                "3D Web UX",
                "Interactive Design",
                "Fluid Animation",
                "Conversion Layouts"
              ],
              href: "#contact",
              linkText: "See examples"
            },
            {
              title: "Local SEO",
              description: "Clean structure and schema designed to help nearby customers find you first.",
              tags: [
                "Google Maps SEO",
                "Schema Markup",
                "Local Search",
                "Content Structure"
              ],
              href: "#contact",
              linkText: "Learn more"
            },
            {
              title: "Performance",
              description: "Fast, secure hosting with lightning load times across mobile and desktop.",
              tags: [
                "Mobile Speed",
                "Secure Hosting",
                "Core Web Vitals",
                "Fast Load Times"
              ],
              href: "#contact",
              linkText: "Learn more"
            },
            {
              title: "Web Strategy",
              description: "Tailored digital roadmaps that turn site visitors into paying local clients.",
              tags: [
                "User Journeys",
                "Brand Positioning",
                "Conversion Strategy",
                "Wireframing"
              ],
              href: "#contact",
              linkText: "Learn more"
            }
          ]}
          linkText="Learn more"
        />
      </div>

      <div id="metrics" data-webild-section="MetricsPhotoHold" data-webild-section-id="MetricsPhotoHold-1" data-section="metrics">
        <MetricsPhotoHold
          note="Measured results"
          title="Performance numbers"
          imageSrc="https://img.b2bpic.net/free-photo/businesswoman-analyzing-financial-growth-report-typing-company-strategy-computer-keyboard-executive-manager-working-late-night-marketing-project-startup-office-close-up_482257-74982.jpg"
          imageAlt="Businesswoman analyzing financial growth report typing company strategy on computer keyboard Executive manager working late at night at marketing project in startup office Close up"
          items={[
            {
              value: 200,
              suffix: "%",
              label: "Faster load speed"
            },
            {
              value: 85,
              suffix: "%",
              label: "Client retention"
            },
            {
              value: 45,
              suffix: "%",
              label: "Inquiry growth"
            }
          ]}
        />
      </div>

      <div id="testimonial" data-webild-section="TestimonialCommentCards" data-webild-section-id="TestimonialCommentCards-1" data-section="testimonial">
        <TestimonialCommentCards
          note="Testimonials"
          title="What Local Clients Say"
          items={[
            {
              quote: "Mackcode transformed our coffee shop site with interactive 3D menus. Online order inquiries jumped instantly.",
              name: "Daniel Okafor",
              company: "Nexus Coffee",
              imageSrc: "https://img.b2bpic.net/free-photo/smiling-handsome-man-meeting_329181-1766.jpg",
              count: 5
            },
            {
              quote: "Our architectural portfolio now features smooth 3D renders. Client retention rose significantly after launch.",
              name: "Megan Reid",
              company: "Summit Arch",
              imageSrc: "https://img.b2bpic.net/free-photo/young-beautiful-businesswoman-posing-isolated_329181-15414.jpg",
              count: 5
            },
            {
              quote: "The custom interactive showcase doubled our consultation requests within three weeks. Outstanding work.",
              name: "Callum Ramirez",
              company: "Haven Interior",
              imageSrc: "https://img.b2bpic.net/free-photo/tired-serious-young-dark-skinned-woman-engineer-looking-her-drawing_273609-13930.jpg",
              count: 5
            },
            {
              quote: "High performance typography and fast 3D visuals helped our gym stand out in local search results.",
              name: "Lauren Patel",
              company: "Apex Fitness",
              imageSrc: "https://img.b2bpic.net/free-photo/executive-working-alone-office_1098-2097.jpg",
              count: 5
            },
            {
              quote: "Mackcode built a breathtaking site that displays our floral arrangements. Our online bookings skyrocketed.",
              name: "Ryan Graham",
              company: "Bloom Floristry",
              imageSrc: "https://img.b2bpic.net/free-photo/smiling-young-florist-holding-spikelet-shop_23-2147882391.jpg",
              count: 5
            }
          ]}
          cardLabel="Review"
        />
      </div>

      <div id="faq" data-webild-section="FaqCommentThreads" data-webild-section-id="FaqCommentThreads-1" data-section="faq">
        <FaqCommentThreads
          title="Before you start"
          avatarSrc="https://img.b2bpic.net/free-photo/young-woman-with-planner_1098-21242.jpg"
          avatarAlt="Young woman with planner"
          items={[
            {
              title: "How long does a website build take?",
              description: "Most custom studio builds are completed and launched within 4 to 6 weeks from kickoff.",
              reactions: 5
            },
            {
              title: "Do you handle domain registration and hosting?",
              description: "Yes, we handle technical setup, high-speed hosting, and annual domain management for your business.",
              reactions: 3
            },
            {
              title: "Will 3D graphics slow down my mobile site?",
              description: "No. All 3D elements are lightweight interactive assets optimized specifically for smooth mobile performance.",
              reactions: 6
            },
            {
              title: "Can I edit website content myself later?",
              description: "Yes, we set up simple content editing tools so you can update text and images easily without coding.",
              reactions: 4
            },
            {
              title: "What is included in every web project?",
              description: "Every package includes custom interactive design, mobile optimization, search engine setup, and ongoing support.",
              reactions: 2
            },
            {
              title: "How do we start a project together?",
              description: "Reach out via our contact form to schedule a discovery call and get a tailored proposal for your business.",
              reactions: 4
            }
          ]}
        />
      </div>

      <div id="contact" data-webild-section="ContactFramedWindow" data-webild-section-id="ContactFramedWindow-1" data-section="contact">
        <ContactFramedWindow
          title="Start Your Project"
          email="makcodebros@gmail.com"
          phone="7356743300"
          submitText="Send Request"
          successText="Thank you! We will respond within 24 hours."
          caption="Enquiry: makcodebros@gmail.com | 7356743300"
          chip="ENQUIRIES"
          images={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/desk-arrangement-with-plant-pot_23-2148577670.jpg",
              imageAlt: "Desk arrangement with plant in pot"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/view-modern-photorealistic-lamp_23-2151038941.jpg",
              imageAlt: "View of modern photorealistic lamp"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/notepad-pens-holder-laptop-white-wooden-backdrop_23-2147924132.jpg",
              imageAlt: "Notepad; pens; holder and laptop on white wooden backdrop"
            }
          ]}
          nameLabel="Your Name"
          emailLabel="Email Address"
          extraLabel="Business Name"
          messageLabel="Project Details"
        />
      </div>
    </>
  );
}
