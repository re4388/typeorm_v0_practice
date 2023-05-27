import { AppDataSource } from "./data-source";
import { demo_leftJoinAndSelect } from "./leftJoinAndSelectEX";
import { demo_leftJoinAndMapOne } from "./leftJoinAndMapOneEX";
import { practice1 } from "./practice1";
import { Rent } from "./entity/Rent";
import { RentPhoto } from "./entity/RentPhoto";
import { getTakeAndPhotoByRentId } from "./play0";

AppDataSource.initialize()
  .then(async () => {
    // practice1()
    // demo_leftJoinAndSelect()
    // demo_leftJoinAndMapOne()
    console.log(await getTakeAndPhotoByRentId("2"));
    // // console.log("getRentingInfoByUserId()", await getRentingInfoByUserId('1'));
    // // console.log("getRentingInfoAndPhotosByUserId()", await getRentingInfoAndPhotosByUserId('1'));
  })
  .catch((err) => {
    console.log(err);
  });
