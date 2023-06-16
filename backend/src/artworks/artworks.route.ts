import express from "express";
const router = express.Router();

import { getAll, search } from "./artworks.controller";

router.get("/", getAll);
router.get("/search", search);

export default router;
