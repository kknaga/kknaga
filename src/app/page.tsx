export default function Home() {
  return (
    <main>
      <header>
        <h1>Kareem Aboualnaga</h1>
        <p className="subtitle">Technical Lead &middot; London, UK</p>
        <div className="contact-links">
          <a href="mailto:kareemaboualnaga@gmail.com">kareemaboualnaga@gmail.com</a>
          <a href="https://www.linkedin.com/in/kkmet/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </header>

      <section className="intro-section">
        <p>
          My approach to software engineering is guided by a simple principle: focus on the business objective and the user's needs. Over the years, I've found that the biggest challenge in complex projects isn't the technical execution itself, but maintaining a clear, unbroken connection between the work being done and its actual purpose.
        </p>
      </section>

      <div className="timeline">
        <div className="event">
          <div className="event-date">January 2026 - Present</div>
          <div className="event-content">
            <p>
              Started working as a Frontend Tech Lead at <strong>HubSpot</strong> in London, leading the global search frontend and working on other parts of the content discovery group such as navigation.
            </p>
            <p>
              This move aligns with where I believe I'm most valuable: operating as a software engineer, architect, product manager, and user experience designer simultaneously. I work closely with dedicated specialists in these roles, but I am heavily involved across the board with the goal of building actual user and business value. I leverage AI to accelerate development—building in a day what used to take weeks—while ensuring we move fast safely.
            </p>
          </div>
        </div>

        <div className="event">
          <div className="event-date">June 2025 - January 2026</div>
          <div className="event-content">
            <p>
              Moved to London internally with <strong>AWS</strong> as a Software Engineer. I started working on a data pipeline unifying all data sources within AWS into a single dictionary encompassing all resource types, services, APIs, and more.
            </p>
            <p>
              My work spanned data ingestion and visualizing this data in useful ways for internal users.
            </p>
          </div>
        </div>

        <div className="event">
          <div className="event-date">September 2022 - June 2025</div>
          <div className="event-content">
            <p>
              Joined <strong>Amazon Web Services (AWS)</strong> as a Frontend Engineer in Amsterdam. Over my tenure, I worked across different AWS consoles and led the development of Service Quotas in the console for a year.
            </p>
            <p>
              I prototyped and eventually shipped multiple impactful changes to the Resource Explorer search service. This included rebuilding the search page to make controls immediately available (improving UX) and building facet filtering to help users drill down into specific resource sets and see a breakdown of all their resources at a glance. I was awarded the highest performance rating (Top Talent) for my contributions.
            </p>
          </div>
        </div>

        <div className="event">
          <div className="event-date">July 2021 - September 2022</div>
          <div className="event-content">
            <p>
              Moved to <strong>eBay</strong> as a Software Engineer to join the Ads New Ventures team as a founding member in Amsterdam. I worked on an experimental product for displaying eBay ads on third-party sites, moving fast with a small stakeholder group and publishers like TechRadar and Wikia.
            </p>
            <p>
              I developed an in-house system to extract keywords from webpages to serve as context for relevant ad display. I also built the Brand Manager UI, a tool for managing how brands are shown on eBay and interacting with sellers of those brands. I received an eBay spot award (a monetary performance award) for building the Brand Manager on the side.
            </p>
          </div>
        </div>

        <div className="event">
          <div className="event-date">September 2020 - July 2021</div>
          <div className="event-content">
            <p>
              Worked at <strong>ABN AMRO Bank</strong> on the non-financial risk team in Amsterdam. I was hired to help migrate from AngularJS to VueJS and build new tools on a modern stack.
            </p>
            <p>
              I built a tool for compliance officers to handle incoming requests, maintaining familiar email-like workflows while adding audit capabilities and a protected space for discussions. I also built a tool to control which asset types could not be traded internally to manage conflicts of interest.
            </p>
          </div>
        </div>

        <div className="event">
          <div className="event-date">June 2019 - September 2020</div>
          <div className="event-content">
            <p>
              Moved to the Netherlands to join <strong>SendCloud</strong> as their 40th employee. I worked on extending the shipping platform's UI, building a reusable UI library, and supporting new integrations.
            </p>
            <p>
              I won a hackathon by building a non-blocking UI for long-running tasks (like printing labels), allowing users to multitask while processes ran in the background.
            </p>
          </div>
        </div>

        <div className="event">
          <div className="event-date">September 2018 - June 2019</div>
          <div className="event-content">
            <p>
              Joined a small startup called <strong>Qurba</strong> in Egypt, building an "Egyptian Yelp." I built the UI for consumers, business owners, and administrators.
            </p>
            <p>
              This was a fairly complex UI involving geolocation, infinite scrolling, and highly interactive elements across the page with multiple browsing modes (map/list).
            </p>
          </div>
        </div>

        <div className="event">
          <div className="event-date">2017 - 2018</div>
          <div className="event-content">
            <p>
              Started my software engineering career as a freelancer on <strong>Upwork</strong>. I worked with over 60 clients and quickly became a top-rated freelancer.
            </p>
            <p>
              I built a wide variety of projects: adding sections to e-commerce stores, developing Shopify and Wordpress themes, creating highly interactive landing pages (like one for a car dealership), and fixing issues across various CMS sites.
            </p>
          </div>
        </div>
      </div>

      <section className="hobbies-section">
        <h2>Personal life and hobbies</h2>
        <ul className="hobby-list">
          <li className="hobby-item">
            Since 2017, I've been building and running personal projects that have grown to serve hundreds of thousands of users (e.g., <a href="https://lolskin.info" target="_blank" rel="noopener noreferrer">lolskin.info</a>, <a href="https://hexfuser.com" target="_blank" rel="noopener noreferrer">hexfuser.com</a>, <a href="https://kkmet.com" target="_blank" rel="noopener noreferrer">kkmet.com</a>, <a href="https://thecarpicker.com" target="_blank" rel="noopener noreferrer">thecarpicker.com</a>). I self-host a server at home for these sites, which taught me about ownership, full-stack development, and SEO.
          </li>
          <li className="hobby-item">
            I used to do realistic pencil drawings in the early 2010s. You can still find my old work on my <a href="https://www.deviantart.com/specialflavour" target="_blank" rel="noopener noreferrer">deviantART profile</a>.
          </li>
          <li className="hobby-item">
            Gaming has been a main hobby for most of my life. I typically stick to one "main" game for years—from DOS games like Prince of Persia to Tiberian Sun, Red Alert 2, Silkroad Online, Guild Wars 2, and League of Legends.
          </li>
          <li className="hobby-item">
            I speak Arabic and English. I also recently obtained Dutch citizenship and speak a little bit of Dutch.
          </li>
        </ul>
      </section>
    </main>
  );
}
