import { embedChunks } from "src/pages/lib/rag/embed-local";

embedChunks().then((result) => {
  console.log("Embedded Chunks:", result.slice(0, 2)); // show first 2
});
