import type { NextApiRequest, NextApiResponse } from "next";
import { type Member } from "../../lib/members";
import * as members from "../../lib/members";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Member[] | string>
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(await members.list());
    case "POST":
      return res.status(201).json(await members.create(req.body));
    case "PUT":
      const updated = await members.update(req.body);
      return res.status(updated.length > 0 ? 200 : 404).json(updated);
    case "DELETE":
      const removed = await members.remove(req.body);
      return res.status(removed.length > 0 ? 204 : 404).end();
    default:
      return res.status(405).send("Method Not Allowed");
  }
}
