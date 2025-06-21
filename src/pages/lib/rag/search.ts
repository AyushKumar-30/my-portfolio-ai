import { pipeline } from "@xenova/transformers";
import { getChunksFromResume } from "./index";
import { cosineSimilarity } from "./similarity";

// Embedder instance shared across functions
let embedder: any;

// Define embedded vector chunk type
export type EmbeddedChunk = {
  id: string;
  source: string;
  content: string;
  vector: number[];
};

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
    const vector = Array.from(output.data) as number[];
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

  const queryVector = Array.from(output.data) as number[];

  const scored = embeddedChunks.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryVector, chunk.vector),
  }));

  const sorted = scored.sort((a, b) => b.score - a.score);
  return sorted.slice(0, topN);
};
