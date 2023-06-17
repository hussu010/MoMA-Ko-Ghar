import express from "express";
const router = express.Router();

import { getAll, remove } from "./artworks.controller";

router.get("/", getAll);
router.delete("/:id", remove);

export default router;
