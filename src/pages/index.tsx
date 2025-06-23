import Head from "next/head";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ayush | Portfolio</title>
      </Head>
      <Layout>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold mb-4">Hi, I'm Ayush</h1>
          <p className="text-lg">
            I'm a full-stack developer (70% frontend, 30% backend) with a
            growing love for GenAI. Welcome to my portfolio.
          </p>
        </motion.div>
      </Layout>
    </>
  );
}
