import { AppDataSource } from "./data-source"
import { Album } from "./entity/Album"
import { Photo } from "./entity/Photo"
import { PhotoMetadata } from "./entity/PhotoMetadata"
import { User } from "./entity/User"
import { facker } from './util'





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




export function practice1() {
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