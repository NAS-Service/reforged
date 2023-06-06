import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('key').notNullable()
      table.string('label').notNullable()
      table.string('description').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
