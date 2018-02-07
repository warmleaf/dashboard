export default function shadowHas(arr, key, val) {
    for (let i = 0; i < arr.length; i += 1) {
        const elm = arr[i]
        if (elm[key] === val) return true
    }
    return false
}