import bcrypt from "bcrypt";

const passwords = ["123456", "admin123", "user123"];

async function main() {
  for (const pw of passwords) {
    const hash = await bcrypt.hash(pw, 10);
    console.log(`${pw} → ${hash}`);
  }
}

main().catch(console.error);
