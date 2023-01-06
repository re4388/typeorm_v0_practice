import { AppDataSource } from "./data-source"
import { Album } from "./entity/Album"
import { Photo } from "./entity/Photo"
import { Photo2 } from "./entity/Photo2"
import { PhotoMetadata } from "./entity/PhotoMetadata"
import { User } from "./entity/User"
import { User2 } from "./entity/User2"
// import { faker } from '@faker-js/faker';
import * as facker from 'faker'
import { createQueryBuilder } from "typeorm"
import { Group } from "./entity/Group"
import { User3 } from "./entity/User3"



console.log("=========  start ========== ")

// export const USERS: User[] = [];

// export function createRandomUser(): User {
//     return {
//         userId: faker.datatype.uuid(),
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         avatar: faker.image.avatar(),
//         password: faker.internet.password(),
//         birthdate: faker.date.birthdate(),
//         registeredAt: faker.date.past(),
//     };
// }

// Array.from({ length: 10 }).forEach(() => {
//     USERS.push(createRandomUser());
// });







async function insertOneUser() {
    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber2"
    user.lastName = "Saw2"
    user.age = 2
    await AppDataSource.manager.save(user)
}

async function findUserByUser(user: User) {
    const users = await AppDataSource.manager.find(User)
    console.log("users found: ", users);
}

async function insertPhoto() {
    const photo = new Photo()
    photo.name = "Me and Bears"
    photo.description = "I am near polar bears"
    photo.filename = "photo-with-bears.jpg"
    photo.views = 1
    photo.isPublished = true
    await AppDataSource.manager.save(photo)
    console.log("Photo has been saved. Photo id is", photo.id)
}


async function insertPhotoV2() {
    const photo = new Photo()
    photo.name = "Bears333"
    photo.description = "I am near polar 333"
    photo.filename = "photo-with-333.jpg"
    photo.views = 3
    photo.isPublished = false

    const photoRepository = AppDataSource.getRepository(Photo)

    await photoRepository.save(photo)
    console.log("Photo has been saved")
}

async function getPhotoInfo() {
    const photoRepository = AppDataSource.getRepository(Photo)
    const allPhotos = await photoRepository.find()
    console.log("All photos from the db: ", allPhotos)

    const firstPhoto = await photoRepository.findOneBy({
        id: 1,
    })
    console.log("First photo from the db: ", firstPhoto)


    const meAndBearsPhoto = await photoRepository.findOneBy({
        name: "Me and Bears",
    })
    console.log("Me and Bears photo from the db: ", meAndBearsPhoto)


    const allViewedPhotos = await photoRepository.findBy({ views: 1 })
    console.log("All viewed photos: ", allViewedPhotos)


    const allPublishedPhotos = await photoRepository.findBy({ isPublished: true })
    console.log("All published photos: ", allPublishedPhotos)


    const [photos, photosCount] = await photoRepository.findAndCount()
    console.log("All photos: ", photos)
    console.log("Photos count: ", photosCount)

}

async function updatePhoto() {
    const photoRepository = AppDataSource.getRepository(Photo)
    const photoToUpdate = await photoRepository.findOneBy({
        id: 1,
    })
    photoToUpdate.name = "Me, my friends and polar bears"
    await photoRepository.save(photoToUpdate)

    // check
    const firstPhoto = await photoRepository.findOneBy({
        id: 1,
    })
    console.log("confirmed photo id:1 is changed: ", firstPhoto)

}



async function removePhotoById(id) {
    const photoRepository = AppDataSource.getRepository(Photo)
    const photoToRemove = await photoRepository.findOneBy({
        id: id,
    })
    await photoRepository.remove(photoToRemove)
}

async function showAllPhotos() {
    const photoRepository = AppDataSource.getRepository(Photo)
    const allPhotos = await photoRepository.find()
    console.log("All photos from the db: ", allPhotos)
}


async function savePhotoAndMeta() {
    // create a photo
    const photo = new Photo()
    photo.name = "QQQMe and Bears"
    photo.description = "QQI am near polar bears"
    photo.filename = "QQphoto-with-bears.jpg"
    photo.views = 1
    photo.isPublished = true

    // create a photo metadata
    const metadata = new PhotoMetadata()
    metadata.height = 640
    metadata.width = 480
    metadata.compressed = true
    metadata.comment = "CCcybershoot"
    metadata.orientation = "CCportrait"
    metadata.photo = photo // this way we connect them

    // get entity repositories
    const photoRepository = AppDataSource.getRepository(Photo)
    const metadataRepository = AppDataSource.getRepository(PhotoMetadata)

    // first we should save a photo
    await photoRepository.save(photo)

    // photo is saved. Now we need to save a photo metadata
    await metadataRepository.save(metadata)

    // done
    console.log(
        "Metadata is saved, and the relation between metadata and photo is created in the database too",
    )
}



async function getPhotoAndMetaV1() {
    const photoRepository = AppDataSource.getRepository(Photo)
    const photos = await photoRepository.find({
        relations: {
            metadata: true,
        },
    })

    // photos will contain an array of photos from the database, and each photo will contain its photo metadata. 
    console.log(photos)
}

async function getPhotoAndMetaV2() {
    const photos = await AppDataSource
        .getRepository(Photo)
        .createQueryBuilder("photo")
        .innerJoinAndSelect("photo.metadata", "metadata")
        .getMany()

    // photos will contain an array of photos from the database, and each photo will contain its photo metadata. 



    //  query: SELECT "photo"."id" AS "photo_id", "photo"."name" AS "photo_name", 
    // "photo"."description" AS "photo_description", "photo"."filename" AS "photo_filename", 
    // "photo"."views" AS "photo_views", "photo"."isPublished" AS "photo_isPublished", 
    // "metadata"."id" AS "metadata_id", "metadata"."height" AS "metadata_height", 
    // "metadata"."width" AS "metadata_width", "metadata"."orientation" AS "metadata_orientation", 
    // "metadata"."compressed" AS "metadata_compressed", "metadata"."comment" AS "metadata_comment", 
    // "metadata"."photoId" AS "metadata_photoId" 
    // FROM "photo" "photo" 
    // INNER JOIN "photo_metadata" "metadata" ON "metadata"."photoId"="photo"."id"
    // 

    // [
    //   Photo {
    //     id: 4,
    //     name: 'QQQMe and Bears',
    //     description: 'QQI am near polar bears',
    //     filename: 'QQphoto-with-bears.jpg',
    //     views: 1,
    //     isPublished: true,
    //     metadata: PhotoMetadata {
    //       id: 1,
    //       height: 640,
    //       width: 480,
    //       orientation: 'CCportrait',
    //       compressed: true,
    //       comment: 'CCcybershoot'
    //     }
    //   }
    // ]
    console.log(photos)
}

async function getSqlTest() {
    const photos = await AppDataSource
        .getRepository(Photo)
        .createQueryBuilder("photo")
        .innerJoinAndSelect("photo.metadata", "metadata")
        .where('photo.isPublished = :isP', { isP: true })
        .andWhere('photo.views = :views', { views: 1 })
        .orderBy('photo.id', 'DESC')
        // .getSql()
        .getMany()

    console.log(photos)
}

async function savePhotoAndMetaWithCascadeEnabled() {
    // create photo object
    const photo = new Photo()
    photo.name = "ZZMe and Bears"
    photo.description = "ZZI am near polar bears"
    photo.filename = "ZZphoto-with-bears.jpg"
    photo.isPublished = true
    photo.views = 11

    // create photo metadata object
    const metadata = new PhotoMetadata()
    metadata.height = 640
    metadata.width = 480
    metadata.compressed = true
    metadata.comment = "ZZcybershoot"
    metadata.orientation = "ZZportrait"


    // The cascade feature only works if you connect the photo to its metadata 
    // from the photo's side
    photo.metadata = metadata // this way we connect them

    // get repository
    const photoRepository = AppDataSource.getRepository(Photo)

    // saving a photo also save the metadata
    await photoRepository.save(photo)

    console.log("Photo is saved, photo metadata is saved too.")
}


async function insertPhotoAndAlbum() {
    // create a few albums
    const album1 = new Album()
    album1.name = "XBears"
    await AppDataSource.manager.save(album1)

    const album2 = new Album()
    album2.name = "XMe"
    await AppDataSource.manager.save(album2)

    // create a few photos
    const photo = new Photo()
    photo.name = "XMe and Bears"
    photo.description = "XI am near polar bears"
    photo.filename = "X photo-with-bears.jpg"
    photo.views = 21
    photo.isPublished = true
    photo.albums = [album1, album2]
    await AppDataSource.manager.save(photo)

    // now our photo is saved and albums are attached to it

}

async function getPhotoAndAlbum() {
    const loadedPhoto = await AppDataSource.getRepository(Photo).findOne({
        where: {
            id: 8,
        },
        relations: {
            albums: true,
        },
    })
    console.log("loadedPhoto", loadedPhoto);
}

async function queryBuilderEx() {
    const photos = await AppDataSource.getRepository(Photo)
        .createQueryBuilder("photo") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
        .innerJoinAndSelect("photo.metadata", "metadata")
        .leftJoinAndSelect("photo.albums", "album")
        .where("photo.isPublished = true")
        .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
        .orderBy("photo.id", "DESC")
        .skip(1)
        .take(2)
        .setParameters({ photoName: "ZZMe and Bears", bearName: "Me and Bears222" })
        .getMany()

    console.log(photos)
}


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


async function insertUser3AndGroup() {

    const g1 = new Group()
    g1.name = facker.internet.color()
    await AppDataSource.manager.save(g1)

    const g2 = new Group()
    g2.name = facker.internet.color()
    await AppDataSource.manager.save(g2)

    const u3 = new User3()
    u3.name = facker.internet.userName()
    u3.email = facker.internet.email()
    u3.groups = [g1, g2]
    await AppDataSource.manager.save(u3)

}





AppDataSource.initialize().then(async () => {
    // demo_leftJoinAndSelect()
    demo_leftJoinAndMapOne()
}).catch(error => console.log(error))


async function demo_leftJoinAndMapOne() {

    // prep
    // insertUser3AndGroup()







    // (async function a2() {
    //     const user = await AppDataSource
    //         .getRepository(User3)
    //         .createQueryBuilder('userAlias')
    //         // 只有 join, 不會拿到另外一個表的東西
    //         // 不過你有group 可能，因此可以用另外一個表建立條件，如果要的話
    //         // 類似下面加上一個 andWhere('group.name = ......)
    //         .leftJoin('userAlias.groups', 'group')
    //         .where('userAlias.id = :id', { id: 1 })
    //         .getOne();

    //     console.log(user)
    //     // User3 {
    //     //     id: 1,
    //     //     name: 'Micheal.Haag',
    //     //     email: 'Zane.Jaskolski54@hotmail.com'
    //     //   }
    // })()


    // (async function a3() {
    //     const user = await AppDataSource
    //         .getRepository(User3)
    //         .createQueryBuilder('userAlias')
    //         // 如果要把 group那邊的東西都返回，要加上 select
    //         .leftJoinAndSelect('userAlias.groups', 'group')
    //         .where('userAlias.id = :id', { id: 1 })
    //         .getOne();

    //     console.log(user)
    //     // User3 {
    //     //     id: 1,
    //     //     name: 'Micheal.Haag',
    //     //     email: 'Zane.Jaskolski54@hotmail.com',
    //     //     groups: [
    //     //       Group { id: 1, name: '#774850' },
    //     //       Group { id: 2, name: '#540a40' }
    //     //     ]
    //     //   }
    // })()



    (async function a1() {
        const user = await AppDataSource
            .getRepository(User3)
            .createQueryBuilder('userAlias')
            // 拿到上面的結果後，還可以另外用 結果去 map 另一個表內
            // 屬性的值，然後只返回mapping的結果
            .leftJoinAndMapOne(
                'userAlias.groups', // mapToProperty
                Group,              // entity
                'group',            // alias             
                'group.ownerId = userAlias.id' // mapping condition
            )
            .where('userAlias.id = :id', { id: 1 })
            .getOne();

        console.log(user)
        // User3 {
        //     id: 1,
        //     name: 'Micheal.Haag',
        //     email: 'Zane.Jaskolski54@hotmail.com',
        //     group: Group { id: 1, name: '#774850' }
        //   }
    })()




}


function demo_leftJoinAndSelect() {
    // ref: https://typeorm.io/select-query-builder#joining-and-mapping-functionality

    // want to insert 2 photo2 into 1 user2
    // const InsertUse2AndPhoto2Arg: InsertUse2AndPhoto2Arg = {
    //     photoUrlList: [facker.internet.url(), facker.internet.url()],
    //     userName: facker.internet.userName()
    // }
    // insertUse2AndPhoto2(InsertUse2AndPhoto2Arg)

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



function practice1() {
    // insertOneUser()
    // insertPhoto()
    // insertPhotoV2()
    // getPhotoInfo()
    // updatePhoto()
    // removePhotoById(1)

    // savePhotoAndMeta()

    // getPhotoAndMetaV1()
    // getPhotoAndMetaV2()

    // getSqlTest()
    // savePhotoAndMetaWithCascadeEnabled()

    // showAllPhotos()

    // for (let i = 0; i < 10; i++) {
    //     savePhotoAndMetaWithCascadeEnabled()
    // }

    // queryBuilderEx()


    // getPhotoAndAlbum()








    // const user = new User()
    // user.firstName = "Timber2"
    // user.lastName = "Saw2"
    // user.age = 2
    // findUserByUser(user)
}