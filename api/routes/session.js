import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  const user = await req.context.models.user.findByPk(req.context.me.id);
  return res.send(user);
});

export default router;
