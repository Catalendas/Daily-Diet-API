import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('snacks', (table) => {
        table.uuid('snack_id').after('id').index()
        table.string('snack_name')
        table.string('snack_description')
        table.enum('insideOroutside', ['inside', 'outside']).defaultTo('inside')
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at')

        table.uuid('user_id')
        table.foreign('user_id').references('user_id').inTable('users')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('snacks')
}

