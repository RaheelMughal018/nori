import express from'express';
import { generateNewShortURL, getURL } from'../controllers/url.controller.js';

const router = express.Router();

router.post("/",generateNewShortURL)
.get('/:id',getURL)

export default router;
