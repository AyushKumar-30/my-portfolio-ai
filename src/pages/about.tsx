import Head from "next/head";
import Layout from "../components/Layout";
import about from "../data/about.json";

export default function About() {
  return (
    <>
      <Head>
        <title>About Me | Ayush</title>
      </Head>
      <Layout>
        <section className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">About Me</h1>

          <p className="text-lg text-gray-700">{about.summary}</p>

          <div className="space-y-4">
            {about.bio.map((paragraph, index) => (
              <p
                key={index}
                className="text-base text-gray-800 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <hr className="my-10 border-t border-gray-300" />

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900">
            Side Projects
          </h2>
          <ul className="space-y-2">
            {about.projects.map((project, index) => (
              <li key={index} className="text-base text-gray-800">
                <span className="font-semibold">{project.name}</span>:{" "}
                {project.summary}
              </li>
            ))}
          </ul>
        </section>

        <hr className="my-10 border-t border-gray-300" />

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900">Education</h2>
          <p className="text-base text-gray-700">
            Pursuing <strong>{about.education.program}</strong> at{" "}
            <strong>{about.education.school}</strong>.<br />
            <em className="text-gray-600">{about.education.scholarship}</em>
          </p>
        </section>

        <hr className="my-10 border-t border-gray-300" />

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900">
            Currently Exploring
          </h2>
          <div className="flex flex-wrap gap-2">
            {about.currentlyExploring.map((topic, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>

        <hr className="my-10 border-t border-gray-300" />

        <section className="space-y-2">
          <h2 className="text-3xl font-semibold text-gray-900">
            Outside of Work
          </h2>
          <p className="text-base text-gray-700">{about.personal.funFact}</p>
        </section>
      </Layout>
    </>
  );
}
