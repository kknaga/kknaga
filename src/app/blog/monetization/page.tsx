import Image from "next/image";
import Link from "next/link";
import businessImage from "../../../../public/business-learning.png";
import "../blog.scss";

export default function BusinessLearning() {
  return (
    <main className="article-container">
      <h1 className="article-heading">
        Observations on Monetizing Small Web Applications
      </h1>
      <p className="article-subtitle">
        <em>Challenges and Learnings from Side Projects</em>
      </p>
      <p className="article-meta">
        <strong>
          March 25, 2025, by Kareem Aboualnaga, Software Engineer @ AWS
        </strong>
      </p>

      <p className="article-paragraph">
        Engineering teaches how to build systems. However, practical experience
        is often required to understand how to build systems that can sustain
        themselves operationally or financially.
      </p>

      <p className="article-paragraph">
        In 2017, I began developing utility tools for League of Legends,
        primarily for learning and experimentation. As usage grew, with some
        tools reaching several thousand monthly visitors, I encountered
        practical challenges related to their financial sustainability. This
        provided an opportunity to observe the economics of small-scale web
        applications.
      </p>

      <Image
        src={businessImage}
        alt="Graph showing the relationship between monetization and user experience"
        className="article-feature-image"
        priority
      />

      <h2 className="article-section-heading">
        The Economics of Side Projects
      </h2>

      <p className="article-paragraph">
        Most of my side projects tend to fall into one of these categories:
      </p>

      <ul className="article-list">
        <li className="article-list-item">
          <strong>Toys</strong> - Built primarily for learning, maintained
          infrequently.
        </li>
        <li className="article-list-item">
          <strong>Labors of Love</strong> - Maintained using personal time and
          resources.
        </li>
        <li className="article-list-item">
          <strong>Sustainable Products</strong> - Generating enough value
          (direct or indirect) to cover costs.
        </li>
      </ul>

      <p className="article-paragraph">
        Transitioning these tools towards sustainability proved difficult due to
        the user base characteristics:
      </p>

      <ul className="article-list">
        <li className="article-list-item">
          High technical literacy (implying high adblocker usage).
        </li>
        <li className="article-list-item">
          Lower average disposable income (many users were students).
        </li>
        <li className="article-list-item">
          Specific, narrow utility needs (users sought quick solutions).
        </li>
      </ul>

      <p className="article-paragraph">
        This user profile presented a challenge for monetization. The audience
        was technically proficient enough to block ads easily and generally
        sought quick solutions without deep site engagement.
      </p>

      <h2 className="article-section-heading">The Adblock Effect on Revenue</h2>

      <p className="article-paragraph">
        Implementing Google AdSense revealed high adblock usage. Analytics
        indicated approximately 70% of visitors blocked ads. Of the remaining
        30%, only a small fraction interacted with the displayed ads.
      </p>

      <p className="article-paragraph">
        This meant a small user segment generated the vast majority of ad
        revenue, effectively subsidizing the service for others. The approximate
        monthly figures were:
      </p>

      <ul className="article-list">
        <li className="article-list-item">50,000 monthly visitors</li>
        <li className="article-list-item">~15,000 seeing ads</li>
        <li className="article-list-item">~200 engaging with ads</li>
        <li className="article-list-item">~$30 monthly revenue</li>
      </ul>

      <p className="article-paragraph">
        Experimenting with more intrusive ad placements (e.g., Google Auto Ads)
        increased daily revenue slightly, to approximately $1. However, this
        correlated with higher bounce rates. It seemed this approach negatively
        impacted the experience primarily for the non-adblocking users,
        potentially selecting for visitors less sensitive to site quality.
      </p>

      <h2 className="article-section-heading">Assessing the Value Exchange</h2>

      <p className="article-paragraph">
        It appeared there was a mismatch between the utility users derived and
        their willingness to support the tools financially or through attention.
        Users found the tools useful for specific tasks but generally did not:
      </p>

      <ol className="article-list">
        <li className="article-list-item">Disable their adblockers.</li>
        <li className="article-list-item">Pay a subscription fee.</li>
        <li className="article-list-item">Make one-time donations.</li>
        <li className="article-list-item">
          Engage deeply with the site beyond their immediate need.
        </li>
      </ol>

      <p className="article-paragraph">
        This seemed less related to product quality and more inherent to the
        nature of these tools: lightweight utilities solving specific,
        infrequent problems.
      </p>

      <p className="article-paragraph">
        While the tools were functional and used, their perceived value did not
        align with common monetization models. This situation seems common for
        side projects that offer niche utility.
      </p>

      <h2 className="article-section-heading">
        Approaches Towards Sustainability for Side Projects
      </h2>

      <p className="article-paragraph">
        Through experimentation, several approaches seemed more viable for
        maintaining these projects long-term:
      </p>

      <h3 className="article-subsection-heading">
        1. Align Monetization with Perceived Value
      </h3>

      <p className="article-paragraph">
        Reducing ad density to minimal, non-intrusive placements slightly
        lowered revenue but correlated with improved user retention metrics.
        This suggested that for quick utility tools, monetization intrusiveness
        should be proportional to the perceived value exchange. Minimal
        perceived value seems to necessitate minimal monetization friction.
      </p>

      <h3 className="article-subsection-heading">
        2. Explore Different User Demographics
      </h3>

      <p className="article-paragraph">
        Developing similar utility tools for different domains, such as{" "}
        <a href="https://thecarpicker.com" className="article-link">
          TheCarpicker.com
        </a>{" "}
        (a simple car comparison tool), revealed differing audience economics.
        Users in domains like car shopping exhibited different ad interaction
        patterns and potentially different adblock usage rates compared to the
        gaming audience.
      </p>

      <h3 className="article-subsection-heading">
        3. Prioritize Learning Objectives
      </h3>

      <p className="article-paragraph">
        Shifting the primary goal from revenue generation to skill development
        provided a different framework for evaluating the projects. Viewing them
        as learning platforms justified the time investment based on technical
        and operational knowledge gained. This perspective helped avoid forcing
        unsuitable monetization strategies onto them.
      </p>

      <h3 className="article-subsection-heading">
        4. Reduce Operational Costs
      </h3>

      <p className="article-paragraph">
        Migrating certain projects, like{" "}
        <a href="https://lolskin.info" className="article-link">
          LOLSkin.info
        </a>{" "}
        (a tool for browsing League of Legends skin information), from cloud
        hosting to a self-managed home server significantly reduced recurring
        costs. This transition also offered practical experience in server
        administration, caching, and performance tuning. A lower, fixed
        operational cost reduced the pressure for revenue generation.
      </p>

      <h2 className="article-section-heading">Value Beyond Direct Revenue</h2>

      <p className="article-paragraph">
        It's also worth noting that side projects offer value beyond direct
        monetization. These include:
      </p>

      <ul className="article-list">
        <li className="article-list-item">
          Demonstrable skills relevant to employment.
        </li>
        <li className="article-list-item">
          Testing grounds for techniques applicable in professional work.
        </li>
        <li className="article-list-item">
          Experience with varied technical challenges.
        </li>
        <li className="article-list-item">
          Personal skill development (e.g., UX considerations).
        </li>
      </ul>

      <p className="article-paragraph">
        These non-financial outcomes represent significant value, particularly
        for projects that exist primarily for learning or exploration.
      </p>

      <h2 className="article-section-heading">
        Observations for Engineers Building Products
      </h2>

      <p className="article-paragraph">
        Based on these experiences, here are some observations for engineers
        considering the operational or business aspects of their own projects:
      </p>

      <ul className="article-list">
        <li className="article-list-item">
          <strong>Utility does not guarantee monetization potential.</strong> A
          useful tool isn't automatically viable commercially.
        </li>
        <li className="article-list-item">
          <strong>Consider audience economics early.</strong> User demographics
          and behavior patterns constrain monetization options.
        </li>
        <li className="article-list-item">
          <strong>Learning itself has value.</strong> Skills gained can justify
          project effort independent of revenue.
        </li>
        <li className="article-list-item">
          <strong>Focus on sustainable operation.</strong> Ensure a project can
          be maintained at low cost before attempting scale.
        </li>
        <li className="article-list-item">
          <strong>Recognize the portfolio effect.</strong> A collection of small
          projects can provide diverse learning experiences.
        </li>
      </ul>

      <h2 className="article-section-heading">
        Concluding Thoughts on Side Project Economics
      </h2>

      <p className="article-paragraph">
        The environment for side projects seems likely to remain challenging.
        Factors like competition for user attention, hosting costs, and user
        technical sophistication suggest that sustainable projects might
        increasingly need to:
      </p>

      <ul className="article-list">
        <li className="article-list-item">
          Deliver highly specific, targeted value.
        </li>
        <li className="article-list-item">
          Operate with high efficiency and low cost.
        </li>
        <li className="article-list-item">
          Identify non-intrusive, value-aligned monetization if any.
        </li>
        <li className="article-list-item">
          Address clearly identified needs within an audience.
        </li>
      </ul>

      <p className="article-paragraph">
        This suggests engineers should consider not only the technical
        implementation but also the operational sustainability and user
        economics when developing side projects.
      </p>

      <p className="article-paragraph">
        Ultimately, sustainability for a side project might not equate to
        profitability. It can also mean achieving a balance where the value
        delivered—to users and the creator (through learning or
        portfolio)—justifies the effort and cost of its maintenance.
      </p>

      <div className="article-back-link">
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}

export const metadata = {
  title:
    "Observations on Monetizing Small Web Applications | Kareem Aboualnaga",
  description:
    "Exploring challenges and learnings from monetizing side projects and small web applications, including ad revenue, user engagement, and finding sustainable approaches.",
  keywords: [
    "web application monetization",
    "side projects",
    "ad revenue",
    "adblock effect",
    "sustainable side projects",
    "software engineering",
    "web development economics",
  ],
  authors: [{ name: "Kareem Aboualnaga" }],
  openGraph: {
    title: "Observations on Monetizing Small Web Applications",
    description:
      "Challenges and Learnings from Side Projects in Web Development",
    type: "article",
    publishedTime: "2025-03-25T00:00:00.000Z",
    authors: ["Kareem Aboualnaga"],
    tags: ["Web Development", "Monetization", "Side Projects", "Business"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Observations on Monetizing Small Web Applications",
    description:
      "Challenges and Learnings from Side Projects in Web Development",
  },
};
