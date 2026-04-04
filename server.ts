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
    
    if (!appPassword) {
      console.warn("GMAIL_APP_PASSWORD is not set.");
      return res.status(200).json({ success: true, note: "Mocked" });
    }

    // 🚀 THE NUCLEAR FIX: Forces IPv4 and explicit TLS handshake
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'h14agr@gmail.com',
        pass: appPassword.replace(/\s+/g, '') // Automatically cleans spaces
      },
      // This is the magic part for Render:
      family: 4, // Forces IPv4 (Avoids IPv6 timeout)
      tls: {
        rejectUnauthorized: false,
        servername: 'smtp.gmail.com' // Helps with handshake on cloud IPs
      },
      connectionTimeout: 15000 // If it can't connect in 15s, stop spinning
    });

    const { to, subject, html } = req.body;

    try {
      console.log(`Attempting email to: ${to}`);
      const info = await transporter.sendMail({
        from: '"De Dental Square" <h14agr@gmail.com>',
        to,
        subject,
        html
      });
      
      console.log("✅ SUCCESS:", info.messageId);
      res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
      console.error("❌ NODEMAILER ERROR:", error);
      res.status(500).json({ success: false, error: error instanceof Error ? error.message : error });
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
  console.error("Fatal Server Error:", err);
  process.exit(1);
});
