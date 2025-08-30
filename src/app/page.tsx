import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";
import { ProjectAnalyticsChart } from "./components/ProjectAnalyticsChart";
import { AnalyticsOverview } from "./components/AnalyticsOverview";
import { unstable_cache } from "next/cache";

export type CloudflareAnalytics = {
  projectId: string;
  visitors: { date: string; count: number }[];
};

type Section = {
  title: string;
  items: {
    date: string;
    type: string;
    title: string;
    link: string;
    imageSrc: string;
    imageAlt: string;
    description: string;
    zoneId?: string;
    monthlyVisitors?: number;
    unoptimized?: boolean;
  }[];
};

const sectionsData: Section[] = [
  {
    title: "Articles & Insights",
    items: [
      {
        date: "August 2025",
        type: "Article",
        title: "The Perfect Machine Nobody Needs",
        link: "/blog/engineering-efficiency",
        imageSrc: "/perfect-machine.png",
        imageAlt: "A complex machine representing over-engineering",
        description:
          "Why talented teams get lost building complex systems that don't solve real problems, and the importance of staying focused on the 'why'.",
      },
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
          "A directory with 32,000+ pages across 18 languages. Started as a skin browser but evolved based on how users actually used it.",
        zoneId: "5c56eaea28aa0992dbd345c612a94f59",
        monthlyVisitors: 89000,
      },
      {
        date: "Ongoing since 2019",
        type: "Digital Laboratory",
        title: "KKMet",
        link: "https://kkmet.com",
        imageSrc: "/kkmet.webp",
        imageAlt: "KKMet logo",
        description:
          "My development playground that grew into a collection of tools including champion randomizers and a ping visualizer.",
        zoneId: "d6d1a369b822e4a56d40c85a17dd2dcc",
        monthlyVisitors: 58000,
      },
      {
        date: "Ongoing from 2021",
        type: "Web tool",
        title: "Hexfuser",
        link: "https://hexfuser.com",
        imageSrc: "/hexfuser.jpg",
        imageAlt: "Hexfuser logo",
        description:
          "A multilingual League of Legends tool built to compare different interface designs. Helps me understand what users prefer in terms of UI complexity.",
        zoneId: "c9dfb96f65564c5ae4c2f8e0d5213443",
        monthlyVisitors: 13000,
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

// Function to fetch data from Cloudflare wrapped in unstable_cache
async function getCloudflareAnalytics(): Promise<CloudflareAnalytics[]> {
  return fetchAndCacheCloudflareData();
}

// The actual fetching function that will be cached
const fetchAndCacheCloudflareData = unstable_cache(
  async () => {
    console.log(
      "Fetching Cloudflare analytics data - this should only run once per day"
    );

    const dates = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const projectsWithZoneIds = sectionsData
      .flatMap((section) => section.items)
      .filter((item) => item.zoneId && item.zoneId.trim() !== "");

    const analyticsPromises = projectsWithZoneIds.map(async (project) => {
      const analytics: CloudflareAnalytics = {
        projectId: project.title,
        visitors: [],
      };

      try {
        const query = `
          query {
            viewer {
              zones(filter: { zoneTag: "${project.zoneId}" }) {
                httpRequests1dGroups(
                  limit: 30, 
                  filter: { 
                    date_geq: "${dates[0]}",
                    date_leq: "${dates[dates.length - 1]}"
                  }
                ) {
                  dimensions {
                    date
                  }
                  uniq {
                    uniques
                  }
                }
              }
            }
          }
        `;

        const response = await fetch(
          "https://api.cloudflare.com/client/v4/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            },
            body: JSON.stringify({ query }),
          }
        );

        const data = await response.json();
        const requests =
          data?.data?.viewer?.zones[0]?.httpRequests1dGroups || [];

        requests.forEach((req: any) => {
          const date = req.dimensions.date;
          const uniques = req.uniq.uniques || 0;

          analytics.visitors.push({
            date,
            count: uniques,
          });
        });

        const dateMap = new Map(
          analytics.visitors.map((v) => [v.date, v.count])
        );
        analytics.visitors = dates.map((date) => ({
          date,
          count: dateMap.get(date) || 0,
        }));
      } catch (error) {
        console.error(`Error fetching data for ${project.title}:`, error);

        analytics.visitors = dates.map((date) => ({
          date,
          count: 0,
        }));
      }

      return analytics;
    });

    return Promise.all(analyticsPromises);
  },

  ["cloudflare-analytics-data-v1"],

  {
    revalidate: 86400,

    tags: ["cloudflare-analytics"],
  }
);

export default async function Home() {
  let analyticsData: CloudflareAnalytics[] = [];

  try {
    analyticsData = await getCloudflareAnalytics();
  } catch (error) {
    console.error("Failed to fetch Cloudflare analytics:", error);
  }
  return (
    <div className={styles.page}>
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

          {section.title === "Side Projects" && analyticsData.length > 0 && (
            <div className={styles.analyticsGrid}>
              <AnalyticsOverview analyticsData={analyticsData} />
            </div>
          )}
          <div className={styles.projectGrid}>
            {section.items.map((item, itemIndex) => {
              const projectAnalytics = analyticsData.find(
                (a) => a.projectId === item.title
              );

              return (
                <div className={styles.projectCard} key={itemIndex}>
                  <div className={styles.projectInfo}>
                    <div className={styles.projectDate}>{item.date}</div>
                    <div className={styles.projectType}>{item.type}</div>
                  </div>
                  <h3>
                    <Link href={item.link}>{item.title}</Link>
                  </h3>
                  <p>{item.description}</p>

                  {projectAnalytics && (
                    <div className={styles.miniChartContainer}>
                      <div className={styles.miniStatsGrid}>
                        <div className={styles.miniStat}>
                          <span className={styles.miniStatValue}>
                            {projectAnalytics.visitors
                              .reduce((sum, day) => sum + day.count, 0)
                              .toLocaleString()}
                          </span>
                          <span className={styles.miniStatLabel}>
                            30-Day Total
                          </span>
                        </div>
                        <div className={styles.miniStat}>
                          <span className={styles.miniStatValue}>
                            {Math.round(
                              projectAnalytics.visitors.reduce(
                                (sum, day) => sum + day.count,
                                0
                              ) / projectAnalytics.visitors.length
                            ).toLocaleString()}
                          </span>
                          <span className={styles.miniStatLabel}>
                            Avg Daily
                          </span>
                        </div>
                      </div>
                      <ProjectAnalyticsChart
                        data={projectAnalytics.visitors}
                        simplified={true}
                        color="#8C6E54"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
