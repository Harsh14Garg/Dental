import express from "express";
import path from "path";
import cors from "cors";
import compression from "compression";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(compression());
  app.use(cors());
  app.use(express.json());

  app.use((req, res, next) => {
    if (req.url.startsWith("/api")) {
      console.log(`[${req.method}] ${req.url} - ${req.headers['content-type']}`);
    }
    next();
  });

  app.get("/api/health", (req, res) => res.json({ status: "ok" }));

  app.post("/api/send-email", async (req, res) => {
    const { to, subject, html } = req.body;
    const apiKey = process.env.BREVO_API_KEY;
    
    if (!apiKey) {
      console.error("🚨 BREVO_API_KEY is not set.");
      return res.status(500).json({ error: "Configuration error" });
    }

    try {
      console.log(`Sending email to: ${to}`);
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          sender: { name: "De Dental Square", email: "h14agr@gmail.com" },
          to: [{ email: to }],
          subject: subject,
          htmlContent: html
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Brevo API error:", JSON.stringify(data));
        return res.status(500).json({ error: "Email sending failed", details: data });
      }

      console.log("✅ Mail sent successfully!");
      return res.status(200).json({ success: true });

    } catch (err) {
      console.error("❌ Server error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      maxAge: '1y',
      etag: true,
      lastModified: true
    }));
    // Standard wildcard for Express 4
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(err => console.error(err));