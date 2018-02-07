export default function shadowSet(arr, key, val) {
    for (let i = 0; i < arr.length; i += 1) {
        const elm = arr[i]
        if (elm[key]) elm[key] = val
    }
    return false
}