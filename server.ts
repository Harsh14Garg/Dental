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
    const { to, subject, html } = req.body;
    const appPassword = process.env.GMAIL_APP_PASSWORD;
    
    // ⚡️ SPEED PATCH: Tell the website "Success" immediately 
    // so the user doesn't see a spinning wheel.
    res.status(200).json({ success: true });

    if (!appPassword) return;

    // 🚀 BACKUP LOGIC: The exact setup that worked for you
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'h14agr@gmail.com',
        pass: appPassword
      }
    });

    try {
      console.log(`Background sending to: ${to}`);
      await transporter.sendMail({
        from: '"De Dental Square" <h14agr@gmail.com>',
        to,
        subject,
        html
      });
      console.log("✅ Email sent successfully!");
    } catch (error) {
      console.error("❌ Email background failure:", error);
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
    
    // Express v5 wildcard
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
