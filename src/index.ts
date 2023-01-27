import { AppDataSource } from "./data-source"
import { demo_leftJoinAndSelect } from './leftJoinAndSelectEX'
import { demo_leftJoinAndMapOne } from "./leftJoinAndMapOneEX"
import { practice1 } from "./practice1"
import { Rent } from "./entity/Rent"
import { RentPhoto } from "./entity/RentPhoto"

AppDataSource.initialize().then(async () => {
    // practice1()
    // demo_leftJoinAndSelect()
    // demo_leftJoinAndMapOne()

    console.log(await getTakeAndPhotoByRentId('2'));
    async function getTakeAndPhotoByRentId(rentId){
        try {
            return await AppDataSource
            .getRepository(RentPhoto)
            .createQueryBuilder('rp')
            .select(['rp.take', 'rp.photo'])
            .where('rp.stage = :stage', { stage: 'rent' })
            .andWhere('rp.deletedAt is null')
            .andWhere('rp.rentId = :rentId', { rentId })
            .getMany()
        } catch (error) {
          console.error({ tag: `getRentPhotoTakeAndPhotoByRentId`, msg: JSON.stringify(error)})
          throw error
        }
      }


    // 
    // // console.log("getRentingInfoByUserId()", await getRentingInfoByUserId('1'));
    // async function getRentingInfoByUserId(userId: string): Promise<Rent | undefined> {
    //     try {
    //         const select = [
    //             // 'r.id',
    //             // 'r.timePlanDetailId',
    //             'r.status',
    //         ]
    //         return await AppDataSource
    //             .getRepository(Rent)
    //             .createQueryBuilder('r')
    //             .select(select)
    //             .where('r.hisFlag = :hisFlag', { hisFlag: 'N' })
    //             .andWhere('r.userId = :userId', { userId })
    //             .getOne()
    //     } catch (error) {
    //         console.error({ error, userId })
    //         throw error
    //     }
    // }

    // console.log("getRentingInfoAndPhotosByUserId()", await getRentingInfoAndPhotosByUserId('1'));
    // async function getRentingInfoAndPhotosByUserId(userId: string): Promise<Rent | undefined> {
    //     try {
    //         const select = [
    //             'r.status',
    //             'rp.take',
    //             'rp.photo'
    //         ]
    //         return await AppDataSource
    //             .getRepository(Rent)
    //             .createQueryBuilder('r')
    //             .select(select)
    //             .leftJoin('r.rentPhotos', 'rp')
    //             .where('r.hisFlag = :hisFlag', { hisFlag: 'N' })
    //             .andWhere('r.userId = :userId', { userId })
    //             .andWhere('rp.deletedAt is null')
    //             .andWhere('rp.stage = :stage', { stage: 'rent' })
    //             .getOne()
    //     } catch (error) {
    //         console.error({ error, userId })
    //         throw error
    //     }
    // }






}).catch(error => console.log(error))







