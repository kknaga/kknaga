import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";

const sectionsData = [
  {
    title: "Articles & Insights",
    items: [
      {
        date: "March 2025",
        type: "Article",
        title: "Observations on Monetizing Small Web Applications",
        link: "/blog/product-assessment",
        imageSrc: "/outsiders-see-it-first.png",
        imageAlt: "Article feature image",
        description:
          "Examining the clarity that distance provides, and why it's easier to see the flaws in a system from the outside than from within.",
      },
      {
        date: "March 2025",
        type: "Article",
        title: "Applying Cognitive Models to Interface Design",
        link: "/blog/monetization",
        imageSrc: "/business-learning.png",
        imageAlt: "Business insights article",
        description:
          "My experiences with different monetization approaches and what I've learned about balancing user experience with sustainability.",
      },
      {
        date: "March 2025",
        type: "Case Study",
        title: "The Effect of Perspective on Product Assessment",
        link: "/blog/system-1",
        imageSrc: "/system1-design.png",
        imageAlt: "System 1 design case study",
        description:
          "How understanding user behavior and intuitive decision-making improved the engagement metrics for a simple tool.",
      },
    ],
  },
  {
    title: "Side Projects",
    items: [
      // {
      //   date: "February 2024",
      //   type: "Educational Project",
      //   title: "ProtoGPT - Understanding Transformer Architecture",
      //   link: "/proto-gpt",
      //   imageSrc: "/2x2.png",
      //   imageAlt: "ProtoGPT screenshot",
      //   description:
      //     "An interactive exploration of language model architecture that helps visualize how transformers work through accessible explanations.",
      // },
      {
        date: "Ongoing since 2020",
        type: "Web Directory",
        title: "LOLSkin.info",
        link: "https://lolskin.info",
        imageSrc:
          "https://lolskin.info/_next/image?url=%2Flogo.png&w=1080&q=75",
        imageAlt: "LOLSkin.info screenshot",
        unoptimized: true,
        description:
          "A directory with 32,000+ pages across 18 languages. Started as a skin browser but evolved based on how users actually used it. Currently gets about 89,000 monthly visitors.",
      },
      {
        date: "Ongoing since 2019",
        type: "Digital Laboratory",
        title: "KKMet",
        link: "https://kkmet.com",
        imageSrc: "/kkmet.webp",
        imageAlt: "KKMet logo",
        description:
          "My development playground that grew into a collection of tools including champion randomizers and a ping visualizer. Gets around 58,000 monthly visitors.",
      },
      {
        date: "Ongoing from 2021",
        type: "Web tool",
        title: "Hexfuser",
        link: "https://hexfuser.com",
        imageSrc: "/hexfuser.jpg",
        imageAlt: "Hexfuser logo",
        description:
          "A multilingual League of Legends tool built to compare different interface designs. Helps me understand what users prefer in terms of UI complexity. Gets about 13,000 monthly users.",
      },
    ],
  },
  {
    title: "Experimental Projects",
    items: [
      {
        date: "2025",
        type: "Database Project",
        title: "Split Keyboard Database",
        link: "https://skbdb.com",
        imageSrc: "/skbdb.png",
        imageAlt: "Split keyboard database",
        description:
          "A database of split keyboards that explores different ways to organize data.",
      },
      {
        date: "2022",
        type: "Random Selection Tools",
        title: "Champion Randomizer",
        link: "https://kkmet.com/champions",
        imageSrc: "/random-champion.png",
        imageAlt: "Champion randomizer",
        description:
          "A one-click tool for League of Legends players to select random champions with simple filtering options. An experiment in minimal interface design.",
      },
      {
        date: "2022",
        type: "Random Selection Tools",
        title: "The Car Picker",
        link: "https://thecarpicker.com",
        imageSrc: "/thecarpicker.png",
        imageAlt: "The Car Picker",
        description:
          "A random car selection tool to help with car shopping inspiration. Built to understand a different audience and explore the automotive advertising market.",
      },
      {
        date: "2023",
        type: "Random Selection Tools",
        title: "The City Picker",
        link: "https://thecitypicker.com",
        imageSrc: "/city-picker.png",
        imageAlt: "The City Picker",
        description:
          "A tool for randomly selecting cities around the world. Experiments with data categorization and geographical filtering.",
      },
      {
        date: "2019-2020",
        type: "Decision Theory Tools",
        title: "Probability Simulator",
        link: "https://kkmet-com.firebaseapp.com/oddsometer/",
        imageSrc: "/oddsometer.png",
        imageAlt: "Probability simulator",
        description:
          "A visualization tool showing how probability works over many trials versus few, and the difference between short-term variance and long-term expected outcomes.",
      },
      {
        date: "2019",
        type: "Value Calculator",
        title: "WhatTheCost",
        link: "https://whatthecost.com",
        imageSrc: "/wtc.png",
        imageAlt: "WhatTheCost calculator",
        description:
          "A calculator that helps people understand the real value of products based on how often and how long they use them. Was featured in Italian Vogue magazine.",
      },
    ],
  },
  {
    title: "Archive",
    items: [
      {
        date: "2020",
        type: "Community Tool",
        title: "League of Legends City Rankings",
        link: "https://town-faker.web.app",
        imageSrc: "/town-faker.png",
        imageAlt: "City rankings tool",
        description:
          "A League of Legends player registry by city that got 140k visitors in one day. Hit API limitations but taught me about scaling and user registration.",
      },
      {
        date: "2018",
        type: "Gaming Tool",
        title: "Ping Visualizer",
        link: "https://kkmet.com/ping",
        imageSrc: "/ping.png",
        imageAlt: "Ping visualizer",
        description:
          "A tool that shows how network latency feels in real-time. Got 4k+ upvotes on Reddit and is still being shared in gaming communities.",
      },
      {
        date: "2018",
        type: "Gaming Tool",
        title: "Skin Randomizer",
        link: "https://kkmet.com/old-lss",
        imageSrc: "/random-skin.png",
        imageAlt: "Skin randomizer",
        description:
          "One of my first League of Legends tools that helped me learn about search traffic and user intent. Eventually evolved into more complex projects.",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      {/* --- Main Intro Section --- */}
      <div className={styles.main}>
        <div className={styles.intro}>
          <p>
            I build digital products that balance technical quality with human
            experience. Currently at Amazon Web Services (AWS) developing
            resource management tools, my background spans fintech, e-commerce,
            and cloud services. Beyond my day job, I create side projects to
            explore ideas, test assumptions, and better understand how people
            interact with technology. This portfolio documents my 8-year journey
            of building tools that have collectively reached millions of users.
          </p>
        </div>
      </div>

      {sectionsData.map((section, sectionIndex) => (
        <div className={styles.section} key={sectionIndex}>
          <h2>{section.title}</h2>
          <div className={styles.projectGrid}>
            {section.items.map((item, itemIndex) => (
              <div className={styles.projectCard} key={itemIndex}>
                <div className={styles.projectInfo}>
                  <div className={styles.projectDate}>{item.date}</div>
                  <div className={styles.projectType}>{item.type}</div>
                </div>
                <h3>
                  <Link href={item.link}>{item.title}</Link>
                </h3>
                <Link href={item.link} className={styles.projectImage}>
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={300}
                    height={300}
                    unoptimized={item.unoptimized || false}
                  />
                </Link>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
