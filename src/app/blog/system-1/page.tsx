import Link from "next/link";
import "../blog.scss";

export default function System1Design() {
  return (
    <main className="article-container">
      <h1 className="article-heading">
        Applying Cognitive Models to Interface Design
      </h1>
      <p className="article-subtitle">
        <em>
          Observations on improving user interaction by considering System 1
          thinking
        </em>
      </p>
      <p className="article-meta">
        <strong>
          March 28, 2025, by Kareem Aboualnaga, Software Engineer @ AWS
        </strong>
      </p>

      <p className="article-paragraph">
        Interface design often focuses on guiding users through intended
        workflows. An alternative approach considers designing for how users
        behave under conditions of limited attention.
      </p>

      <p className="article-paragraph">
        In 2022, I maintained a simple League of Legends champion randomizer
        tool hosted at{" "}
        <a href="https://kkmet.com/champions" className="article-link">
          kkmet.com/champions
        </a>
        . The tool received steady traffic, approximately 1,000 daily visitors.
        However, engagement metrics indicated brief interactions: users
        typically landed, used the randomize function once or twice, and exited
        within about 30 seconds. While functional, I considered if the user
        experience could be improved.
      </p>

      <p className="article-paragraph">
        My initial approach involved adding features, such as filters for
        excluding champions, role-based filtering, and options specific to
        competitive play formats. These additions did not significantly alter
        user behavior; the pattern of brief, focused interaction persisted.
      </p>

      <h2 className="article-section-heading">
        Considering the User's Cognitive Mode
      </h2>

      <p className="article-paragraph">
        This led me to reconsider the design assumptions. I had been designing
        for a user engaging in deliberate consideration, corresponding to what
        psychologists Daniel Kahneman and Amos Tversky termed "System 2"
        thinking. It seemed more likely users were operating primarily in
        "System 1" mode – quick, intuitive, and requiring minimal cognitive
        effort.
      </p>

      <p className="article-paragraph">
        This aligns with common web browsing behavior, where users often scan
        content quickly and interact with the most prominent element related to
        their immediate goal.
      </p>

      <p className="article-paragraph">
        A key realization was that users likely had minimal investment in the
        website itself. Their objective was to get a champion suggestion quickly
        and return to their primary activity (playing the game). They were
        unlikely to invest effort in learning a complex interface.
      </p>

      <h2 className="article-section-heading">
        Redesign Based on System 1 Principles
      </h2>

      <p className="article-paragraph">
        Based on this understanding, I redesigned the interface focusing on
        principles aligned with System 1 processing:
      </p>

      <ol className="article-list">
        <li className="article-list-item">
          <strong>Make the primary action highly salient:</strong> The randomize
          button was made large, visually distinct (orange), and centrally
          located.
        </li>
        <li className="article-list-item">
          <strong>Minimize cognitive load:</strong> Filtering options were
          simplified to single-click toggles instead of multi-step selectors.
        </li>
        <li className="article-list-item">
          <strong>Reduce attentional demands:</strong> Non-essential elements
          unrelated to the core randomization task were removed.
        </li>
      </ol>

      <h2 className="article-section-heading">
        Observed Results of the Redesign
      </h2>

      <p className="article-paragraph">
        The changes produced measurable shifts in user behavior metrics:
      </p>

      <ul className="article-list">
        <li className="article-list-item">
          Average session duration decreased from 32 seconds to 28 seconds.
        </li>
        <li className="article-list-item">
          Usage of the simplified filter features increased by 47%.
        </li>
        <li className="article-list-item">
          The return visitor rate increased by 22%.
        </li>
      </ul>

      <p className="article-paragraph">
        The reduction in session duration was interpreted positively, suggesting
        users were achieving their goal more efficiently. The increased feature
        usage and return visitor rate indicated the redesigned interface was
        more effective and better received.
      </p>

      <h2 className="article-section-heading">
        Practical Considerations for System 1 Design
      </h2>

      <p className="article-paragraph">
        Designing for System 1 is not about simplification for its own sake, but
        about aligning the interface with how people process information under
        low engagement conditions. Some applicable observations include:
      </p>

      <ul className="article-list">
        <li className="article-list-item">
          <strong>Visual hierarchy guides attention:</strong> Color and contrast
          can effectively signal importance for primary actions.
        </li>
        <li className="article-list-item">
          <strong>Placement influences interaction:</strong> Positioning
          critical elements in expected locations (e.g., top-center) facilitates
          quick identification.
        </li>
        <li className="article-list-item">
          <strong>Visual cues are processed rapidly:</strong> Shapes and
          contrasts are often perceived before text is fully read.
        </li>
        <li className="article-list-item">
          <strong>Decision fatigue impacts usability:</strong> Minimizing the
          number of choices required can reduce cognitive load.
        </li>
        <li className="article-list-item">
          <strong>Consistency aids habit formation:</strong> Predictable
          placement of controls benefits repeat users.
        </li>
      </ul>

      <h2 className="article-section-heading">Ethical Considerations</h2>

      <p className="article-paragraph">
        It is important to note that techniques for streamlining user
        interaction share similarities with manipulative "dark patterns." The
        distinction lies in the designer's intent. Optimizing for System 1
        should aim to help users achieve their own goals more easily, not
        exploit cognitive biases for outcomes detrimental to the user.
      </p>

      <p className="article-paragraph">
        For the champion randomizer, the goal was clearly aligned with user
        intent (quick results). In contexts involving sensitive actions like
        purchases or data sharing, careful consideration is needed before
        heavily optimizing for low-attention interaction patterns.
      </p>

      <h2 className="article-section-heading">
        Applying Learnings in Other Contexts
      </h2>

      <p className="article-paragraph">
        I have found these principles applicable even in the context of
        enterprise software development at AWS. Users performing routine tasks
        often operate with reduced attention. Identifying these workflows and
        applying System 1 design considerations where appropriate has shown
        potential for improving user satisfaction without sacrificing necessary
        complexity.
      </p>

      <h2 className="article-section-heading">Concluding Observations</h2>

      <p className="article-paragraph">
        When building utility tools where users prioritize speed and efficiency:
      </p>

      <ul className="article-list">
        <li className="article-list-item">
          Acknowledge that user investment in the tool itself may be low.
        </li>
        <li className="article-list-item">
          Design interfaces considering users may be distracted or impatient.
        </li>
        <li className="article-list-item">
          Ensure the primary action is visually prominent and easily accessible.
        </li>
        <li className="article-list-item">
          Question the necessity of elements not directly supporting the core
          task.
        </li>
        <li className="article-list-item">
          Evaluate success based on task completion efficiency rather than time
          spent on site.
        </li>
      </ul>

      <p className="article-paragraph">
        Users of utility tools typically seek results with minimal friction.
        Designing for this reality can lead to more effective and well-received
        products.
      </p>

      <div className="article-back-link">
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Applying Cognitive Models to Interface Design | Kareem Aboualnaga",
  description:
    "How considering System 1 thinking patterns can improve user interaction and interface design for web applications.",
  keywords: [
    "interface design",
    "System 1 thinking",
    "cognitive models",
    "UX design",
    "user interaction",
    "web application design",
    "user experience",
  ],
  authors: [{ name: "Kareem Aboualnaga" }],
  openGraph: {
    title: "Applying Cognitive Models to Interface Design",
    description:
      "Observations on improving user interaction by considering System 1 thinking patterns",
    type: "article",
    publishedTime: "2025-03-28T00:00:00.000Z",
    authors: ["Kareem Aboualnaga"],
    tags: [
      "UX Design",
      "Interface Design",
      "Cognitive Psychology",
      "Web Development",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Applying Cognitive Models to Interface Design",
    description: "How System 1 thinking influences better interface design",
  },
};
