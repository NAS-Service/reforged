import { join } from 'path'
import { BaseCommand, args } from '@adonisjs/core/build/standalone'

export default class Apps extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'reforged:make:apps'

  @args.string({ description: 'Name of the model class' })
  public name: string

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    loadApp: false,
    stayAlive: false,
  }

  public async run() {
    const stub = join(__dirname, '..', 'templates', 'model.txt')
    const path = this.application.resolveNamespaceDirectory('models')

    this.generator
      .addFile(this.name, { pattern: 'pascalcase', form: 'singular' })
      .stub(stub)
      .destinationDir(path || 'app/Models')
      .useMustache()
      .appRoot(this.application.cliCwd || this.application.appRoot)

    await this.generator.run()

    this.generator.addFile('Test')
    this.logger.info('Hello world!')
  }
}
