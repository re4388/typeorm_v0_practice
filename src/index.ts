import { AppDataSource } from "./data-source"
import { demo_leftJoinAndSelect } from './leftJoinAndSelectEX'
import { demo_leftJoinAndMapOne } from "./leftJoinAndMapOneEX"
import { practice1 } from "./practice1"

AppDataSource.initialize().then(async () => {
    // practice1()
    demo_leftJoinAndSelect()
    // demo_leftJoinAndMapOne()
}).catch(error => console.log(error))







