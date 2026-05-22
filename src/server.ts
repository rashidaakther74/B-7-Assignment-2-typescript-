import app from "./app";
import config from "./config";
import { dataBase } from "./db";

const server = async() => {
  await dataBase()
  app.listen(config.port, () => {
    console.log(`Server is running on port http://localhost:${config.port}`);
  });
};

server();
