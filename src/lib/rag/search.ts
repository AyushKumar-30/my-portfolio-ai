import { pipeline } from "@xenova/transformers";
import { getChunksFromResume } from "./index";
import { cosineSimilarity } from "../../lib/rag/similarity";
import { EmbeddedChunk, Vector } from "../../lib/rag/types";

// Shared embedder instance
let embedder: any;

// Holds vectorized chunks
let embeddedChunks: EmbeddedChunk[] = [];

// One-time embedding for all resume chunks
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

    const vector = Array.from(output.data).map((v) =>
      typeof v === "number" ? v : Number(v)
    ) as Vector;

    embeddedChunks.push({ ...chunk, vector });
  }
};

// Retrieve top N relevant chunks for a query
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

  const queryVector = Array.from(output.data).map((v) =>
    typeof v === "number" ? v : Number(v)
  ) as Vector;

  const scored = embeddedChunks.map((chunk) => {
    const chunkVector = Array.isArray(chunk.vector)
      ? chunk.vector.map((v) => (typeof v === "number" ? v : Number(v)))
      : [];

    return {
      ...chunk,
      score: cosineSimilarity(queryVector, chunkVector),
    };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, topN);
};
