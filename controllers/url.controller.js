import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

export async function generateNewShortURL(req, res) {
    const { redirectURL } = req.body;

    if (!redirectURL) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const shortURL = nanoid(8);
        const newURL = await URL.create({
            short_url: shortURL,
            redirect_url: redirectURL,
            visit_history: [],
            clicks: 0,
        });

        res.status(201).json({ message: "Short URL created successfully", shortURL: newURL.short_url });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getURL(req, res) {
    try {
        const shortId = req.params.id;
        console.log("🚀 ~ getURL ~ shortId:", shortId);

        const entry = await URL.findOneAndUpdate(
            { short_url: shortId },
            {
                $push: {
                    visit_history: { timestamp: Date.now() }
                },
                $inc: { clicks: 1 }
            },
            { new: true } // This option returns the updated document
        );

        // console.log("🚀 ~ getURL ~ entry:", entry);

        if (!entry) {
            return res.status(404).json({ error: "URL not found" });
        }

        res.redirect(entry.redirect_url);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
