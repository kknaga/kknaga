import Link from "next/link";
import "../blog.scss";

export default function PerfectMachine() {
  return (
    <main className="article-container">
      <h1 className="article-heading">The Perfect Machine Nobody Needs</h1>
      <p className="article-subtitle">
        <em>
          How great teams get lost building things that don't matter
        </em>
      </p>
      <p className="article-meta">
        <strong>
          August 30, 2025, by Kareem Aboualnaga, Software Engineer @ AWS
        </strong>
      </p>

      <p className="article-paragraph">
        There’s a pattern you start to see in big companies, and it’s a strange
        one. You can have a room full of the smartest engineers, people at the
        top of their field, and they can spend years building something that, in
        the end, doesn’t really matter.
      </p>

      <p className="article-paragraph">
        It’s not because they’re not working hard. They’re working incredibly
        hard. The problem is that somewhere along the line, the work itself
        becomes the point.
      </p>

      <p className="article-paragraph">
        I've seen systems where the sheer scale is staggering. A project might
        involve pulling data from a dozen different sources, transforming it,
        and making it available in a combined way. To achieve this, the system
        becomes a complex web of interconnected components. Every change, no
        matter how small, takes a long time to propagate, just to make sure
        nothing breaks. The team's attention becomes focused on alarms, bug
        counts, and making sure all the pieces stay running.
      </p>

      <p className="article-paragraph">
        They're the best mechanics in the world, keeping this incredible machine
        alive.
      </p>

      <p className="article-paragraph">
        But if you ask a simple question like, "How is this combined data being
        used?" or "Is it solving a real problem for anyone?", the answer is often
        vague, or even unknown. The team is so focused on maintaining the system
        that they haven't had time to measure its impact.
      </p>

      <p className="article-paragraph">
        How does this happen? How does a team of smart, dedicated people end up
        building something that isn't really helping anyone?
      </p>

      <p className="article-paragraph">
        It usually starts with good intentions. The goal is to build a robust,
        scalable system, a truly impressive piece of engineering. But over time,
        something shifts. The individual goals start to diverge from the
        product's goals.
      </p>

      <p className="article-paragraph">
        An engineer's priority becomes closing tickets or delivering features on
        time, not necessarily creating something that customers love. The
        metrics that matter become internal and technical. The team gets so
        caught up in optimizing the system that they forget to optimize for the
        user.
      </p>

      <p className="article-paragraph">
        The result is a complex, expensive machine that consumes talent, time,
        and resources. It might be a marvel of engineering, but it's not really
        solving a problem.
      </p>

      <p className="article-paragraph">
        The real trap is losing sight of the "why." We get so focused on the
        "how"—the code, the architecture, the performance—that we forget to
        constantly ask:
      </p>

      <ul className="article-list">
        <li className="article-list-item">Why are we doing this?</li>
        <li className="article-list-item">What problem are we solving?</li>
        <li className="article-list-item">How will we know if we're successful?</li>
      </ul>

      <p className="article-paragraph">
        The most valuable skill an engineer can have isn't just technical
        expertise; it's the ability to step back and ask those questions. It's
        the ability to challenge assumptions and to make sure that the team is
        always focused on delivering value to the end user.
      </p>

      <p className="article-paragraph">
        Because a simple tool that people actually use is always better than a
        complex machine that solves a problem nobody has. It's about remembering
        the point of the thing.
      </p>

      <div className="article-back-link">
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}

export const metadata = {
  title: "The Perfect Machine Nobody Needs | Kareem Aboualnaga",
  description:
    "A software engineer's perspective on how large organizations can lose sight of their goals, focusing on building complex systems instead of valuable products.",
  keywords: [
    "corporate inefficiency",
    "systems thinking",
    "product development",
    "software engineering",
    "engineering culture",
    "big tech",
    "project management",
    "over-engineering",
  ],
  authors: [{ name: "Kareem Aboualnaga" }],
  openGraph: {
    title: "The Perfect Machine Nobody Needs",
    description: "How great teams get lost building things that don't matter.",
    type: "article",
    publishedTime: "2025-08-30T00:00:00.000Z",
    authors: ["Kareem Aboualnaga"],
    tags: [
      "Systems Thinking",
      "Engineering Culture",
      "Product Management",
      "Big Tech",
      "Organizational Behavior",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Perfect Machine Nobody Needs",
    description:
      "Why do smart teams build complex things that nobody uses? A look at how the work itself can become the goal.",
  },
};