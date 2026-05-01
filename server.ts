import express from "express";
import path from "path";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (req, res) => res.json({ status: "ok" }));

  app.post("/api/send-email", async (req, res) => {
    const { to, subject, html } = req.body;
    const apiKey = process.env.BREVO_API_KEY;
    
    // ⚡️ SPEED PATCH: Success response first!
    res.status(200).json({ success: true });

    if (!apiKey) {
      console.error("Missing BREVO_API_KEY environment variable");
      return;
    }

    try {
      console.log(`Background sending to: ${to}`);
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
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

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Email failed:", errorData);
      } else {
        console.log("✅ Mail Sent via Brevo API!");
      }
    } catch (err) {
      console.error("❌ Email request failed:", err);
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
    app.use(express.static(distPath));
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