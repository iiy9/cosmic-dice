import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

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

    console.log("Token Response Status:", tokenRes.status);
    const tokenData = await tokenRes.json();
    console.log("Token Data:", JSON.stringify(tokenData));

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Failed to get token. Status:", tokenRes.status, "Data:", tokenData);
      return NextResponse.json({ error: "Authentication failed. Could not retrieve access token." }, { status: tokenRes.status || 500 });
    }
    const token = tokenData.access_token;

    // Fetch random data from the TRNG service
    const trngRes = await fetch(`https://op.spacecomputer.io/api/v1/services/trng`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("TRNG Response Status:", trngRes.status);
    const trngData = await trngRes.json();
    console.log("TRNG Data:", JSON.stringify(trngData));

    if (!trngRes.ok || !trngData.data) {
      console.error("Failed to get TRNG data. Status:", trngRes.status, "Data:", trngData);
      return NextResponse.json({ error: "Failed to get random data from TRNG service." }, { status: trngRes.status || 500 });
    }
    const hex = trngData.data;
    const source = trngData.src;

    // Parse the hex string to get a number between 1 and 6
    const roll = (parseInt(hex.slice(0, 8), 16) % 6) + 1;
    console.log("Generated hex:", hex, "Roll:", roll);

    return NextResponse.json({ roll, source });
  } catch (err) {
    console.error("Error in GET /api/roll:", err);
    return NextResponse.json({ error: "Failed to roll." }, { status: 500 });
  }
}