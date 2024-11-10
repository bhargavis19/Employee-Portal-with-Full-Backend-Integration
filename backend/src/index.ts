import V1Routes from "./routes";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

class Bootstrap extends V1Routes {
  constructor() {
    super();
    const app = express();
    app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    app.get("/health", (req, res) => {
      res.json({ message: "Server is running properly" });
    });
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use("/api/v1", this.v1Router);
    app.listen(4000, () => {
      console.log("App is running on port 4000");
    });
  }
}

new Bootstrap();
