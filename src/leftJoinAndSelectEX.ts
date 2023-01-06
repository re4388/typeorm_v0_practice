import { AppDataSource } from "./data-source"
import { Photo2 } from "./entity/Photo2"
import { User2 } from "./entity/User2"
import { facker } from './util'


interface InsertUse2AndPhoto2Arg {
    photoUrlList: [string, string]
    userName: string
}

async function insertUse2AndPhoto2(InsertUse2AndPhoto2Arg: InsertUse2AndPhoto2Arg) {
    const { photoUrlList, userName } = InsertUse2AndPhoto2Arg

    const photo2_1 = new Photo2()
    photo2_1.url = photoUrlList[0]
    await AppDataSource.manager.save(photo2_1)

    const photo2_2 = new Photo2()
    photo2_2.url = photoUrlList[1]
    await AppDataSource.manager.save(photo2_2)


    const user2 = new User2()
    user2.name = userName
    user2.photos = [photo2_1, photo2_2]
    await AppDataSource.manager.save(user2)

}

export function demo_leftJoinAndSelect() {

    console.log("run demo_leftJoinAndSelect")
    // ref: https://typeorm.io/select-query-builder#joining-and-mapping-functionality

    // want to insert 2 photo2 into 1 user2
    const InsertUse2AndPhoto2Arg: InsertUse2AndPhoto2Arg = {
        photoUrlList: [facker.internet.url(), facker.internet.url()],
        userName: facker.internet.userName()
    }
    insertUse2AndPhoto2(InsertUse2AndPhoto2Arg)

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