import Head from "next/head";
import Layout from "../components/Layout";
import education from "../data/education.json";

export default function Education() {
  return (
    <>
      <Head>
        <title>Education | Ayush</title>
      </Head>
      <Layout>
        <h1 className="text-3xl font-bold mb-6">Education</h1>
        <div className="space-y-6">
          {education.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{item.school}</h2>
              <p className="text-sm text-gray-600 italic">
                {item.degree} — {item.location} ({item.startYear}–{item.endYear}
                )
              </p>
              <ul className="list-disc list-inside text-sm text-gray-800 mt-2">
                {item.details.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
