import { pipeline } from "@xenova/transformers";
import { getChunksFromResume } from "@/lib/rag/index";
import { Vector } from "../../lib/rag/types";

let embedder: any;

export const embedChunks = async () => {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }

  const chunks = getChunksFromResume();
  const embeddedChunks = [];

  for (const chunk of chunks) {
    const output = await embedder(chunk.content, {
      pooling: "mean",
      normalize: true,
    });
    const vector = Array.from(output.data) as Vector;
    embeddedChunks.push({ ...chunk, vector });
  }

  return embeddedChunks;
};
