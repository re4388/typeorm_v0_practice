import { AppDataSource } from "../data-source";
import { Artist } from "../entity/chinook/Artist";

export async function chinookRun() {
  const res = await AppDataSource.getRepository(Artist).find();
  console.log("res", res);
}
