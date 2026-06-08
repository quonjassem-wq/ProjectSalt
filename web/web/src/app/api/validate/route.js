import sql from "@/app/api/utils/sql";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const hwid = searchParams.get("hwid");

  if (!key || !hwid) {
    return new Response("invalid", { status: 200 });
  }

  try {
    const [existingKey] = await sql`
      SELECT * FROM keys 
      WHERE key_value = ${key} AND is_active = TRUE
    `;

    if (!existingKey) {
      return new Response("invalid", { status: 200 });
    }

    // Check if key is expired
    if (
      existingKey.expires_at &&
      new Date(existingKey.expires_at) < new Date()
    ) {
      await sql`UPDATE keys SET is_active = FALSE WHERE id = ${existingKey.id}`;
      return new Response("invalid", { status: 200 });
    }

    // Check HWID
    if (!existingKey.hwid) {
      // First time use, lock to this HWID
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + existingKey.duration_days);

      await sql`
        UPDATE keys 
        SET hwid = ${hwid}, expires_at = ${expiresAt} 
        WHERE id = ${existingKey.id}
      `;
      return new Response("valid", { status: 200 });
    } else if (existingKey.hwid === hwid) {
      return new Response("valid", { status: 200 });
    } else {
      return new Response("invalid", { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response("invalid", { status: 200 });
  }
}
