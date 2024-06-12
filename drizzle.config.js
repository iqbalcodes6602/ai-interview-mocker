/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    out: "./drizzle",
    verbose: true,
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_URL,
    }
};