import Head from "next/head";
import Layout from "../components/Layout";
import contact from "../data/contact.json";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | Ayush</title>
      </Head>
      <Layout>
        <section className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Contact</h1>

          <p className="text-lg text-gray-700">{contact.note}</p>

          <div className="space-y-3 text-base text-gray-800">
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" />
              <a
                href={`mailto:${contact.email}`}
                className="text-blue-600 underline"
              >
                {contact.email}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-blue-500" />
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                LinkedIn
              </a>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              {contact.location}
            </p>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <em>{contact.availability}</em>
          </div>
        </section>
      </Layout>
    </>
  );
}
