import { AppDataSource } from "../data-source";
import { Actor } from "../entity/dvdrental/Actor";

export async function dvdRental() {
  try {
    // const result = await AppDataSource.getRepository(Actor).findOne({
    //   where: { firstName: "Joe" },
    // });
    // console.log("result", result);

    const res = await AppDataSource.getRepository(Actor)
      .createQueryBuilder("actor")
      .select(["actor.firstName"]) // first_Name <-- this is wrong way to write, 坑
      .where("actor.first_name = :firstName", { firstName: "Joe" })
      // .limit(1)
      // .getRawOne();
      .getOne();
    console.log("res", JSON.stringify(res));
  } catch (error) {
    console.error({ error });
    throw error;
  }
}
