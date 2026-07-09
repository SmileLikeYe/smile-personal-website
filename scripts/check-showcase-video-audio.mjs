import { execFileSync } from "node:child_process";

const videoPath = "public/assets/projects/agent-chief-showcase.mp4";
const streams = JSON.parse(
  execFileSync(
    "ffprobe",
    ["-v", "error", "-show_entries", "stream=codec_type,codec_name,channels", "-of", "json", videoPath],
    { encoding: "utf8" },
  ),
);

const audioStream = streams.streams?.find((stream) => stream.codec_type === "audio");

if (!audioStream) {
  console.error(`${videoPath} is missing an audio stream.`);
  process.exit(1);
}

console.log(`${videoPath} includes ${audioStream.codec_name} audio.`);
