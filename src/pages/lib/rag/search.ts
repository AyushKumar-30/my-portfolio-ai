import { pipeline } from "@xenova/transformers";
import { getChunksFromResume } from "./index";
import { cosineSimilarity } from "./similarity";

let embedder: any;
type EmbeddedChunk = {
  id: string;
  source: string;
  content: string;
  vector: number[];
};

let embeddedChunks: EmbeddedChunk[] = [];

export const loadAndEmbedChunks = async () => {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }

  const chunks = getChunksFromResume();
  embeddedChunks = [];

  for (const chunk of chunks) {
    const output = await embedder(chunk.content, {
      pooling: "mean",
      normalize: true,
    });
    const vector = Array.from(output.data) as number[];
    embeddedChunks.push({ ...chunk, vector });
  }
};

// Get top N matching chunks for a user query
export const getTopChunks = async (query: string, topN = 3) => {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }

  const output = await embedder(query, { pooling: "mean", normalize: true });
  const queryVector = Array.from(output.data) as number[];

  const scored = embeddedChunks.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryVector, chunk.vector),
  }));

  return scored.sort((a, b) => b.score - a.score).slice(0, topN);
};
