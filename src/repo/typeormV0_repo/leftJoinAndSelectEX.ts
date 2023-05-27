import { AppDataSource } from "./data-source";
import { Photo2 } from "./entity/typeormV0/Photo2";
import { User2 } from "./entity/typeormV0/User2";
import { faker } from "./util";
import { isNil } from "ramda";

interface InsertUse2AndPhoto2Arg {
  photoUrlList: [string, string];
  userName: string;
}

async function seed() {
  const usersList: User2[] = [];

  for (let i = 0; i < 20; i++) {
    const user2 = new User2();
    user2.name = faker.internet.userName();
    const photos = [];
    for (let i = 0; i < 20; i++) {
      const photo = new Photo2();
      photo.url = faker.internet.url();
      photos.push(photo);
    }
    await AppDataSource.manager.save(photos);
    user2.photos = [...photos];
    usersList.push(user2);
  }

  await AppDataSource.manager.save(usersList);
}

export function demo_leftJoinAndSelect() {
  isDBEmpty();

  // console.log("run demo_leftJoinAndSelect")
  // ref: https://typeorm.io/select-query-builder#joining-and-mapping-functionality

  ///////////////////////

  // want to load user "Timber" with all of his photos:
  // 用 leftJoinAndSelect 順便也幫你 select 好裡面的東西
  // (async function a1() {
  //     const user = await AppDataSource.getRepository(User2)
  //         .createQueryBuilder("u2")  // u2 is alias
  //         .leftJoinAndSelect("u2.photos", "photoQQ") // photoQQ is also alias
  //         .where("u2.name = :name", { name: "Myra_Corwin77" })
  //         .andWhere("photoQQ.url = :url", { url: 'http://nina.name' })
  //         .getOne()
  //     console.log("user", user);
  // })()

  // result
  // user User2 {
  //     id: 2,
  //     name: 'Myra_Corwin77',
  //     photos: [ Photo2 { id: 3, url: 'http://nina.name' } ]
  //   }

  // want to join data without its selection
  // 用 innerJoin 就沒有順便幫你 select 了
  // (async function a2() {
  //     const user = await AppDataSource.getRepository(User2)
  //         .createQueryBuilder("u2")  // u2 is alias
  //         .innerJoin("u2.photos", "photoQQ")
  //         .where("u2.name = :name", { name: "Myra_Corwin77" })
  //         .andWhere("photoQQ.url = :url", { url: 'http://nina.name' })
  //         .getOne()
  //     console.log("user", user);
  // })()
  // result:
  // user User2 { id: 2, name: 'Myra_Corwin77' }

  // (async function a3() {
  //     const user = await AppDataSource.getRepository(User2)
  //         .createQueryBuilder("u2")
  //         .leftJoinAndMapOne(
  //             "u2.photo",
  //             "u2.id",
  //             "photoQQ",
  //             "photoQQ.id = 1"
  //         )
  //         .where("u2.name = :name", { name: "Myra_Corwin77" })
  //         .getOne()
  //     console.log("user", user);
  // })()
  // result:
}

async function isDBEmpty() {
  const user = await AppDataSource.getRepository(User2).find();
  if (!isNil(user)) return;
  console.log("db is empty, shall run seed");
  seed();
}
