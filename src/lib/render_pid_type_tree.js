export default function renderPidTypeTree(arr, start, func) {
  const node = arr.find(a => a.id === start) || {};
  if (func) func(node);
  node.children = arr.filter(a => a.pid === start).map(a => renderPidTypeTree(arr, a.id, func));
  return node;
}
