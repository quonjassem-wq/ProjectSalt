import sql from "@/app/api/utils/sql";
import { randomBytes } from "crypto";

export async function POST(request) {
  try {
    const { password, duration, amount } = await request.json();
    const ADMIN_PASS = "SALTY-WAS-HEREWITHSUGAR_ezez.meow.ez.kidd_keno";

    if (password !== ADMIN_PASS) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const keys = [];
    for (let i = 0; i < (amount || 1); i++) {
      const keyValue = "SALT-" + randomBytes(8).toString("hex").toUpperCase();
      const [newKey] = await sql`
        INSERT INTO keys (key_value, duration_days) 
        VALUES (${keyValue}, ${duration || 1}) 
        RETURNING *
      `;
      keys.push(newKey);
    }

    return Response.json({ keys });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to generate keys" }, { status: 500 });
  }
}
