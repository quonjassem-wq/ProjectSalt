import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { keyValue } = await request.json();
    if (!keyValue)
      return Response.json({ error: "Key required" }, { status: 400 });

    const [keyData] = await sql`
      SELECT * FROM keys WHERE key_value = ${keyValue}
    `;

    if (!keyData) {
      return Response.json({ error: "Invalid key" }, { status: 404 });
    }

    return Response.json({
      valid:
        keyData.is_active &&
        (!keyData.expires_at || new Date(keyData.expires_at) > new Date()),
      hwid: keyData.hwid,
      expires_at: keyData.expires_at,
      duration: keyData.duration_days,
    });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
