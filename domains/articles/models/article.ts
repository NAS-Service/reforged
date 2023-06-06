import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { DateTime } from 'luxon'
import {
  responsiveAttachment,
  ResponsiveAttachmentContract,
} from '@ioc:Adonis/Addons/ResponsiveAttachment'
import Hashtag from 'Domains/articles/models/hashtag'
import User from 'Domains/users/models/User'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public short: string

  @column()
  @slugify({ strategy: 'dbIncrement', fields: ['short'] })
  public slug: string

  @responsiveAttachment()
  public thumbnail: ResponsiveAttachmentContract

  @column()
  public content: string

  @column()
  public readingTime: number

  @column()
  public userId: string

  @column()
  public status: 'draft' | 'published' | 'archived' | 'private'

  @column.dateTime()
  public publishedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>

  @manyToMany(() => Hashtag)
  public tags: ManyToMany<typeof Hashtag>
}
