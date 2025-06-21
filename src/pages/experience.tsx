import Head from "next/head";
import experience from "../data/experience.json";
import WorkCard from "../components/WorkCard";
import Layout from "../components/Layout";

export default function Experience() {
  return (
    <>
      <Head>
        <title>Experience | Ayush</title>
      </Head>
      <Layout>
        <h1 className="text-3xl font-bold mb-6">Experience</h1>
        <div className="space-y-6">
          {experience.map((item, index) => (
            <WorkCard
              key={item.company + index}
              title={item.role}
              org={item.company}
              location={item.location}
              date={item.date}
              description={item.bullets}
              techStack={item.techStack}
            />
          ))}
        </div>
      </Layout>
    </>
  );
}
