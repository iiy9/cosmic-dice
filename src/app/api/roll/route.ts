import { NextResponse } from "next/server";

const OP_AUTH_URL = process.env.OP_AUTH_URL;
const OP_CLIENT_ID = process.env.OP_CLIENT_ID;
const OP_CLIENT_SECRET = process.env.OP_CLIENT_SECRET;

console.log("OP_AUTH_URL:", OP_AUTH_URL);
console.log("OP_CLIENT_ID:", OP_CLIENT_ID);
console.log("OP_CLIENT_SECRET:", OP_CLIENT_SECRET);

// Check if the environment variables are set
if (!OP_AUTH_URL || !OP_CLIENT_ID || !OP_CLIENT_SECRET) {
  throw new Error("Missing environment variables for Auth0");
}


export async function GET() {
  try {
    // Get the token from Auth0
    const tokenRes = await fetch(`https://${OP_AUTH_URL}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: OP_CLIENT_ID,
        client_secret: OP_CLIENT_SECRET,
        audience: "https://op.spacecomputer.io/api",
        grant_type: "client_credentials",
      }),
    });

    const tokenData = await tokenRes.json();
    const token = tokenData.access_token;

    // Fetch random data from the TRNG service
    const trngRes = await fetch(`https://op.spacecomputer.io/api/v1/services/trng`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const trngData = await trngRes.json();
    const hex = trngData.data;
    const source = trngData.src;

    // Parse the hex string to get a number between 1 and 6
    const roll = (parseInt(hex.slice(0, 8), 16) % 6) + 1;

    return NextResponse.json({ roll, source });
  } catch (err) {
    console.error("Error in GET /api/roll:", err);
    return NextResponse.json({ error: "Failed to roll." }, { status: 500 });
  }
}