import { chinookRun } from "./chinook_repo";
import { AppDataSource } from "./data-source";
import { dvdRental } from "./dvdrental_repo";
import { Artist } from "./entity/chinook/Artist";

AppDataSource.initialize()
  .then(async () => {
    /**
     * 記得換 database
     */

    await dvdRental();
    // await chinookRun();

    // practice1()
    // demo_leftJoinAndSelect()
    // demo_leftJoinAndMapOne()
    // console.log(await getTakeAndPhotoByRentId("2"));
    // // console.log("getRentingInfoByUserId()", await getRentingInfoByUserId('1'));
    // // console.log("getRentingInfoAndPhotosByUserId()", await getRentingInfoAndPhotosByUserId('1'));
  })
  .catch((err) => {
    console.log(err);
  });
