import { types } from "cassandra-driver"

export class Post {

    id: string

    text: string

    user_id: string

    createdat: Date 

    updatedat: Date
}
