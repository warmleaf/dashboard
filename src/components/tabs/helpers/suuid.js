// Get a universally unique identifier
let count = 0;
export default function suuid() {
  count += 1;
  return count;
}

export function reset() {
  count = 0;
}
