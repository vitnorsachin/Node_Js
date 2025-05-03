import { createReadStream, createWriteStream } from "fs";
import path from "path";

const inputFilePath = path.join(import.meta.dirname, "input.txt");
const outputFilePath = path.join(import.meta.dirname, "output.txt");

const readableStream = createReadStream(inputFilePath, {
  encoding: "utf-8",
  highWaterMark: 16,
});

const writableStream = createWriteStream(outputFilePath);
readableStream.pipe(writableStream);

readableStream.on("error", (err) => console.error("Error:", err));
writableStream.on("error", (err) => console.error("Error:", err));
