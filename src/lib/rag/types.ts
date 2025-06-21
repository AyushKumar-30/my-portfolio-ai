export type Vector = number[];

export type Chunk = {
  id: string;
  source: string;
  content: string;
};

export type EmbeddedChunk = Chunk & {
  vector: Vector;
};
