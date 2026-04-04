import express from "express";
import path from "path";
import nodemailer from "nodemailer"; // 🚀 Reverting to Nodemailer for Gmail Inbox magic

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/send-email", async (req, res) => {
    const appPassword = process.env.GMAIL_APP_PASSWORD;
    const { to, subject, html } = req.body;
    
    if (!appPassword) {
      console.warn("GMAIL_APP_PASSWORD is not set. Email not sent.");
      return res.status(200).json({ success: true, note: "Email mocked" });
    }

    // 🚀 THE MAGIC CONFIG: This worked on your backup site
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'h14agr@gmail.com',
        pass: appPassword
      }
    });

    try {
      console.log(`Attempting Gmail SMTP to: ${to}`);
      
      const info = await transporter.sendMail({
        from: '"De Dental Square" <h14agr@gmail.com>',
        to,
        subject,
        html
      });

      console.log("✅ SUCCESS: Email sent via Gmail SMTP:", info.messageId);
      res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
      console.error("❌ NODEMAILER ERROR:", error);
      res.status(500).json({ success: false, error: error instanceof Error ? error.message : error });
    }
  });

  // Production environment setup
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production (Render), serve the static built files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Express v5 named wildcard for SPA routing
    app.get('/{*splat}', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal Server Error:", err);
  process.exit(1);
});
