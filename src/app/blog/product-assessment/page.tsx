import Link from "next/link";
import "../blog.scss";

export default function WhyOutsidersSeeItFirst() {
  return (
    <main className="article-container">
      <h1 className="article-heading">
        The Effect of Perspective on Product Assessment
      </h1>
      <p className="article-subtitle">
        <em>
          Observations on why external viewpoints often identify issues or
          potential more readily than internal teams
        </em>
      </p>
      <p className="article-meta">
        <strong>
          March 30, 2025, by Kareem Aboualnaga, Software Engineer @ AWS
        </strong>
      </p>

      <p className="article-paragraph">
        There appears to be a distinct clarity that comes with observing
        something from a distance, without direct involvement in its creation.
      </p>

      <p className="article-paragraph">
        Recently, I encountered a YouTube video titled "The Tower of Babel
        (Biblically Accurate)". Despite the creator having a small subscriber
        base, this specific video gained significant traction. The reasons
        seemed apparent: the title combined intrigue with specificity, the
        content fulfilled the promise, and the presentation had a particular
        quality that resonated. Recognizing its appeal did not require deep
        marketing analysis; the effectiveness felt intuitive.
      </p>

      <p className="article-paragraph">
        This prompted reflection on a recurring pattern observed not just in
        online content, but also in software development, product design, and
        even internal tooling. From an external standpoint, it often seems
        straightforward to identify what is effective and what is not. Many
        people can form a quick, often accurate, assessment of a product's
        appeal or usability upon first encounter. Yet, for those involved in the
        development process – attending meetings, writing code, refining details
        – this immediate clarity can become obscured.
      </p>

      <h2 className="article-section-heading">
        The Challenge of Internal Perspective
      </h2>

      <p className="article-paragraph">
        My professional work involves large-scale systems at AWS, focusing on
        technical aspects like performance and reliability. Alongside this, I
        develop personal side projects. A consistent observation across both
        contexts is that proximity to a project tends to reduce one's ability to
        perceive it as an outsider would.
      </p>

      <ul className="article-list">
        <li className="article-list-item">
          Familiarity with a feature's intended purpose can overshadow
          assessment of its actual usability or obviousness to a new user.
        </li>
        <li className="article-list-item">
          Knowledge of constraints, technical debt, or future plans can
          normalize design choices that might otherwise seem counter-intuitive.
        </li>
        <li className="article-list-item">
          It becomes easy to forget that most users are not deeply invested in
          understanding the system; they typically scan for immediate value or
          function.
        </li>
      </ul>

      <h2 className="article-section-heading">
        The Clarity Afforded by Distance
      </h2>

      <p className="article-paragraph">
        An external observer lacks internal context, and this lack of context is
        precisely what facilitates a clear assessment of the immediate user
        experience.
      </p>

      <p className="article-paragraph">
        This observer does not need to comprehend the underlying system
        architecture or development history. They primarily react to friction
        points, notice communication gaps, or identify areas where the product
        fails to resonate quickly. Questions that seem basic or obvious from
        this perspective can often highlight fundamental issues.
      </p>

      <p className="article-paragraph">
        This underscores the value of seeking external feedback. A brief review
        by someone unfamiliar with the project can yield insights potentially
        missed by the core team over extended periods.
      </p>

      <h2 className="article-section-heading">
        Maintaining Objectivity During Development
      </h2>

      <p className="article-paragraph">
        Based on these observations, certain practices might help retain a
        degree of external perspective while building:
      </p>

      <ul className="article-list">
        <li className="article-list-item">
          <strong>Seek external feedback early and often,</strong> even on
          incomplete work. Initial reactions can be particularly informative.
        </li>
        <li className="article-list-item">
          <strong>Observe without explaining.</strong> If a feature or concept
          requires significant explanation to be understood, its clarity may
          need improvement.
        </li>
        <li className="article-list-item">
          <strong>Recognize the importance of clear communication.</strong>{" "}
          Titles, labels, button text, and introductory sentences significantly
          impact initial perception and usability.
        </li>
        <li className="article-list-item">
          <strong>Assume initial indifference.</strong> A product must quickly
          demonstrate value to capture and retain user attention.
        </li>
        <li className="article-list-item">
          <strong>Cultivate detachment.</strong> Personal investment in specific
          features or ideas can impede objective evaluation.
        </li>
      </ul>

      <h2 className="article-section-heading">
        Clarity as a Factor in Adoption
      </h2>

      <p className="article-paragraph">
        Widespread adoption, sometimes termed virality, often seems correlated
        with clarity. An idea or product that is easily understood, clearly
        presented, and resonates with a need or interest is more likely to be
        shared.
      </p>

      <p className="article-paragraph">
        Products or content that gain rapid traction often exhibit sharpness
        rather than just volume. They tend to communicate a core value
        proposition efficiently and avoid unnecessary complexity.
      </p>

      <h2 className="article-section-heading">Concluding Observation</h2>

      <p className="article-paragraph">
        Encountering a product and questioning its design or market fit often
        stems from applying that external perspective. You are likely noticing
        something the internal team may have overlooked due to their proximity.
      </p>

      <p className="article-paragraph">
        This external viewpoint is challenging to maintain when deeply involved
        in a project, yet it remains a highly valuable lens for assessment.
      </p>

      <div className="article-back-link">
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}

export const metadata = {
  title: "The Effect of Perspective on Product Assessment | Kareem Aboualnaga",
  description:
    "Why external viewpoints often identify issues or potential more readily than internal teams in product development and design.",
  keywords: [
    "product assessment",
    "external perspective",
    "product design",
    "software development",
    "user experience",
    "product adoption",
    "clarity in design",
  ],
  authors: [{ name: "Kareem Aboualnaga" }],
  openGraph: {
    title: "The Effect of Perspective on Product Assessment",
    description:
      "Why outsiders see problems and opportunities in products more clearly than internal teams",
    type: "article",
    publishedTime: "2025-03-30T00:00:00.000Z",
    authors: ["Kareem Aboualnaga"],
    tags: ["Product Design", "UX", "Development", "Software Engineering"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Effect of Perspective on Product Assessment",
    description:
      "Why outsiders often see what insiders miss in product development",
  },
};
