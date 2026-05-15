export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  try {
    const body = await req.json();
    const { to, subject, html } = body;
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      console.error("🚨 BREVO_API_KEY is not set.");
      return new Response(
        JSON.stringify({
          error: "Configuration error: BREVO_API_KEY environment variable is missing on Netlify.",
        }),
        {
          status: 500,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    console.log(`Sending email to: ${to}`);
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "De Dental Square", email: "h14agr@gmail.com" },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Brevo API error:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Email sending failed", details: data }),
        {
          status: 500,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    console.log("✅ Mail sent successfully!");
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }
};

export const config = {
  path: "/api/send-email",
};
