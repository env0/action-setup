import { setFailed, startGroup, endGroup } from '@actions/core'
import { Inputs } from '../inputs'
import runSelfInstaller from './run'

export { runSelfInstaller }

export async function install(inputs: Inputs) {
  async function install() {
    startGroup('Running self-installer...')
    const status = await runSelfInstaller(inputs)
    endGroup()
    return status
  }
  let success = false
  let step = 0;
  let status;
  for (step < 3 && !success) {
    // Runs 5 times, with values of step 0 through 4.
    console.log('Trying to install');
    status = await install();
    step++;
    if(!status) {
      success = true
      console.log("yay")
    }
  }
  if (!success) {
    return setFailed(`Something went wrong, self-installer exits with code ${status}`)
  }
}

export default install
