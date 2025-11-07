import "dotenv/config";
import server from "./src/app.js";
import { connectDatabase } from "./src/database/db.js";
console.log(process.env.PORT);

connectDatabase()
  .then(() => {
    const port = process.env.PORT;
    server.listen(port || 5000, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed", err);
  });
