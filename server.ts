import express from "express";
import path from "path";
import nodemailer from "nodemailer";

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
    
    if (!appPassword) {
      console.warn("GMAIL_APP_PASSWORD is not set. Email not sent.");
      return res.status(200).json({ success: true, note: "Email mocked (no App Password)" });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'h14agr@gmail.com',
        pass: appPassword
      }
    });

    const { to, subject, html } = req.body;

    try {
      const info = await transporter.sendMail({
        from: '"De Dental Square" <h14agr@gmail.com>',
        to,
        subject,
        html
      });
      
      console.log("Email sent successfully:", info.messageId);
      res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
      console.error("Error sending email via Gmail:", error);
      res.status(500).json({ success: false, error });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    // ⚠️ THE FIX: Dynamically import Vite ONLY in development mode!
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production (Render), just serve the built frontend files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Added a catch block to surface any future hidden errors!
startServer().catch((err) => {
  console.error("Fatal Server Error:", err);
  process.exit(1);
});
