import express from "express";
import path from "path";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/send-email", async (req, res) => {
    const appPassword = process.env.GMAIL_APP_PASSWORD;
    const { to, subject, html } = req.body;
    
    // Response first so the user doesn't see a spinning wheel
    res.status(200).json({ success: true });

    if (!appPassword) return;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'h14agr@gmail.com',
        pass: appPassword
      }
    });

    try {
      await transporter.sendMail({
        from: '"De Dental Square" <h14agr@gmail.com>',
        to,
        subject,
        html
      });
      console.log("✅ Email sent!");
    } catch (error) {
      console.error("❌ Email failed:", error);
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
    app.get('/{*splat}', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal Error:", err);
  process.exit(1);
});
