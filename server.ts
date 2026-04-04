import express from "express";
import path from "path";
import { Resend } from 'resend'; // 🚀 Switched from Nodemailer to Resend

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Initialize Resend with your API Key from Render Environment
  const resend = new Resend(process.env.RESEND_API_KEY);

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/send-email", async (req, res) => {
    const apiKey = process.env.RESEND_API_KEY;
    const { to, subject, html } = req.body;
    
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not set. Email not sent.");
      return res.status(200).json({ success: true, note: "Email mocked" });
    }

    try {
      console.log(`Attempting API email to: ${to}`);
      
      const { data, error } = await resend.emails.send({
        // ⚠️ NOTE: Resend Free Tier requires sending FROM 'onboarding@resend.dev'
        from: 'Dental Square <onboarding@resend.dev>', 
        to: [to],
        subject: subject,
        html: html,
      });

      if (error) {
        console.error("❌ RESEND ERROR:", error);
        return res.status(400).json({ success: false, error });
      }

      console.log("✅ SUCCESS: Email sent via Resend API");
      res.status(200).json({ success: true, id: data?.id });
    } catch (error) {
      console.error("❌ SERVER ERROR:", error);
      res.status(500).json({ success: false, error });
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

// Catch-all for fatal startup errors
startServer().catch((err) => {
  console.error("Fatal Server Error:", err);
  process.exit(1);
});
