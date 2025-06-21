import { pipeline } from "@xenova/transformers";
import { getChunksFromResume } from "./index";
import { cosineSimilarity } from "../../lib/rag/similarity";
import { EmbeddedChunk, Vector } from "../../lib/rag/types";

// Embedder instance shared across functions
let embedder: any;

// Holds all embedded resume chunks
let embeddedChunks: EmbeddedChunk[] = [];

// Load + embed chunks once at server startup
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
    const vector = Array.from(output.data) as Vector;
    embeddedChunks.push({ ...chunk, vector });
  }
};

// Compute cosine similarity and return top N matches
export const getTopChunks = async (
  query: string,
  topN = 3
): Promise<EmbeddedChunk[]> => {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }

  const output = await embedder(query, {
    pooling: "mean",
    normalize: true,
  });

  const queryVector = Array.from(output.data) as Vector;

  const scored = embeddedChunks.map((chunk) => {
    const vectorA = queryVector.map(Number); // 🛠 ensure number[]
    const vectorB = (chunk.vector as unknown[]).map(Number); // 🛠 forcefully sanitize

    return {
      ...chunk,
      score: cosineSimilarity(vectorA, vectorB),
    };
  });
  const sorted = scored.sort((a, b) => b.score - a.score);
  return sorted.slice(0, topN);
};
