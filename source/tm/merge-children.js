import {cloneWithClasses, getClonerForClasses} from './clone-with-classes';
import isIn from './is-in';

function mergeChildren(currentChildren, targetChildren, persisting) {
  let targetIndex = 0;
  let currentIndex = 0;
  let targetChild = targetChildren[targetIndex];
  let currentChild = currentChildren[currentIndex];
  let children = [];
  while(targetChild || currentChild) {
    while(targetChild && !isIn(targetChild, persisting)) {
      children.push(cloneWithClasses(targetChild, ['add']));
      targetChild = targetChildren[++targetIndex];
    }
    while(currentChild && !isIn(currentChild, persisting)) {
      if(!isIn(currentChild, children)) {
        children.push(cloneWithClasses(currentChild, ['add', 'show', 'hide']));
      }
      currentChild = currentChildren[++currentIndex];
    }
    if(targetChild) {
      children.push(cloneWithClasses(targetChild, ['add', 'show']));
      targetChild = targetChildren[++targetIndex];
      currentChild = currentChildren[++currentIndex];
    }
  }
  return children;
}

export default mergeChildren;
