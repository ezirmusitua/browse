import * as path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import get_item from "../../data";
import { eFileType, iFileItem } from "../../interface";

function random_int(max: number) {
  return Math.floor(Math.random() * max);
}

const MAX_GUESS_COUNT = 9;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") return res.status(404).end("Method Not Allowed");
  const dir = req.query.dir + "";
  const guess_count = random_int(MAX_GUESS_COUNT);
  let item: iFileItem = await get_item(dir);
  let parent = { ...item };
  for await (const _ of Array.from({ length: guess_count })) {
    const candidates = item.children.filter(
      (i) => i.type == eFileType.DIRECTORY
    );
    if (candidates.length != 0) {
      item = candidates[random_int(candidates.length)];
      item = await get_item(path.join(item.parent, item.name));
    } else {
      item = { ...parent };
    }
    parent = { ...item };
  }
  item = item.children.filter((i) => i.type == eFileType.FILE)[0];
  return res.status(200).json(item || parent.children[0]);
}
