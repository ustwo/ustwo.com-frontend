import {exec} from 'child_process';

/*
 * Creates the SPA (Single Page Application compilation) bundle
 *
 * TODO: Consolidate approach
 */
function spa() {
  return exec("./src/scripts/spa.sh");
}

export default spa;
