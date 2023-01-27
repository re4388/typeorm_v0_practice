import { AppDataSource } from "./data-source"
import { Group } from "./entity/Group"
import { User3 } from "./entity/User3"
import { faker } from "./util"


// faker.random.arrayElement()
// console.log(faker.random.arrayElement([1, 2, 3, 4, 45]));


async function insertUser3AndGroup() {

    const g1 = new Group()
    g1.name = faker.internet.color()
    await AppDataSource.manager.save(g1)

    const g2 = new Group()
    g2.name = faker.internet.color()
    await AppDataSource.manager.save(g2)

    const u3 = new User3()
    u3.name = faker.internet.userName()
    u3.email = faker.internet.email()
    u3.groups = [g1, g2]
    await AppDataSource.manager.save(u3)

}




/**

LEFT JOINs entity's table, SELECTs the data returned by a join 
and MAPs all that data to some entity's property. 

This is useful when you want to select some data and map it to some virtual property. 

It assume that there is a single row of selecting data, 
and mapped result will be a single selected value. 

You need to specify an alias of the joined data. 
Optionally, you can add condition and parameters used in condition.

 */
export async function demo_leftJoinAndMapOne() {

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
            .createQueryBuilder('user3')
            // 拿到上面的結果後，還可以另外用 結果去 map 另一個表內
            // 屬性的值，然後只返回mapping的結果
            .leftJoinAndMapOne(
                'user3.groups', // mapToProperty
                Group,              // entity
                'group',            // alias             
                'group.ownerId = user3.id' // mapping condition
            )
            .where('user3.id = :id', { id: 1 })
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