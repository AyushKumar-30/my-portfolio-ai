import Layout from "@/components/Layout";
import Head from "next/head";
import projects from "@/data/projects.json";

export default function About() {
  return (
    <>
      <Head>
        <title>About Me | Ayush</title>
      </Head>
      <Layout>
        <h1 className="text-3xl font-bold mb-4">Projects</h1>
        <ul className="space-y-4">
          {projects.map((proj) => (
            <li key={proj.name} className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold">{proj.name}</h2>
              <p className="text-gray-700">{proj.description}</p>
              <div className="text-sm text-blue-600 mt-2">
                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
}
