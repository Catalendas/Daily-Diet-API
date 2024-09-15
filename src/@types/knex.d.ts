import { Knex } from "knex";

declare module 'knex/types/tables' {
    export interface Tables {
        users: {
            user_id: string
            user_name: string
            user_email: string
            user_password: string
            created_at: string
        },

        snacks: {
            snack_id: string
            snack_name: string
            snack_description: string
            insideOroutside: 'inside' | 'outside'
            created_at: string
            updated_at: string

            user_id: string
        }
    }
}