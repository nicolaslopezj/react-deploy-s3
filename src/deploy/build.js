import {Spinner} from 'cli-spinner'
import clc from 'cli-color'
import {exec} from 'child-process-promise'

export default async () => {
  let spinner = new Spinner('%s Building app...')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()

  await exec('npm run build')

  spinner.stop(true)

  console.log(clc.bold('App built'))
}
