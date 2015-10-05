import {exec} from 'child_process';

/*
 * Creates a Vendor bundle
 *
 * TODO: Consolidate approach
 */
function vendors() {
  return exec("./src/scripts/vendors.sh");
}

export default vendors;
