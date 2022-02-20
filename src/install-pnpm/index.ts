import {setFailed, startGroup, endGroup} from '@actions/core'
import {Inputs} from '../inputs'
import runSelfInstaller from './run'

export {runSelfInstaller}

export async function install(inputs: Inputs) {
    startGroup('Running self-installer...');
    async function install() {
        const status = await runSelfInstaller(inputs);
        return status;
    }

    let success = false;
    let step = 0;
    let status;
    while (step < 3 && !success) {
        // Runs 5 times, with values of step 0 through 4.
        console.log('Trying to install');
        status = await install();
        step++;
        if (!status) {
            success = true;
            console.log("yay")
        }
    }
    endGroup();

    if (!success) {
        return setFailed(`Something went wrong, self-installer exits with code ${status}`)
    }
}

export default install
