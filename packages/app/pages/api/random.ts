import { NextApiRequest, NextApiResponse } from "next";
import { get_state } from "../../data";

function random_index(total: number) {
  return Math.floor(Math.random() * total);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") return res.status(404).end("Method Not Allowed");
  const { dir } = req.query;
  const state = await get_state(dir + "");
  const candidates = Object.keys(state.map)
    .map((id) => state.map[id])
    .filter(
      (f) =>
        (f.type == "directory" && f.children.length > 0) ||
        f.mime.startsWith("video")
    );
  const decided = candidates[random_index(candidates.length)];
  if (decided.type == "directory") {
    return res.status(200).json({ id: decided.children[0].id });
  }
  return res.status(200).json({ id: decided.id });
}
