import fs from "fs";
import path from "path";

type Chunk = {
  id: string;
  source: string;
  content: string;
};

// Load and chunk your JSON files into flat facts
export const getChunksFromResume = (): Chunk[] => {
  const about = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src/data/about.json"), "utf-8")
  );
  const experience = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src/data/experience.json"),
      "utf-8"
    )
  );
  const projects = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src/data/projects.json"), "utf-8")
  );
  const education = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src/data/education.json"),
      "utf-8"
    )
  );

  let chunks: Chunk[] = [];

  // about
  chunks.push({
    id: "about_summary",
    source: "about",
    content: about.summary,
  });
  about.bio.forEach((line: string, idx: number) => {
    chunks.push({
      id: `about_bio_${idx}`,
      source: "about",
      content: line,
    });
  });

  // experience
  // experience (formatted for readability)
  experience.forEach((exp: any, i: number) => {
    const header = `Experience ${i + 1}: ${exp.role} at ${exp.company} (${
      exp.date
    })`;
    const bulletPoints = exp.bullets.map((b: string) => `• ${b}`).join("\n");
    const isIntern = exp.role.toLowerCase().includes("intern");
    const tag = isIntern ? "\n(This was an internship)" : "";

    chunks.push({
      id: `experience_${i}`,
      source: exp.company,
      content: `${header}${tag}\n${bulletPoints}`,
    });
  });

  // projects
  projects.forEach((p: any, i: number) => {
    chunks.push({
      id: `project_${i}`,
      source: p.name,
      content: `${p.name} - ${p.description}`,
    });
  });

  // education
  education.forEach((e: any, i: number) => {
    chunks.push({
      id: `education_${i}`,
      source: e.school,
      content: `${e.degree} at ${e.school} (${e.startYear}–${
        e.endYear
      }): ${e.details.join(" ")}`,
    });
  });

  return chunks;
};
