import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('title').notNullable()
      table.string('short').notNullable()
      table.string('slug').notNullable()
      table.json('thumbnail').nullable()
      table.text('content').notNullable()
      table.integer('reading_time').notNullable()
      table.timestamp('published_at', { useTz: true })
      table.enu('status', ['draft', 'published', 'archived', 'private']).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
