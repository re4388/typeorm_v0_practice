import { chinookRun } from "./repo/chinook_repo";
import { AppDataSource } from "./data-source";
import { dvdRental } from "./repo/dvdrental_repo";
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
