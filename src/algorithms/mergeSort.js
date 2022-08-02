export default function mergeSort(arr) {
    const arrCopy = [...arr], aux = Array(arr.length), animations = [];

    mergeSortHelper(arrCopy, aux, 0, arr.length - 1, animations);

    return animations;
}

function mergeSortHelper(arr, aux, left, right, animations) {
    if (left >= right) return;

    let mid = left + Math.floor((right - left) / 2);
    
    mergeSortHelper(arr, aux, left, mid, animations);
    mergeSortHelper(arr, aux, mid + 1, right, animations);

    for (let i = left; i <= right; i++) aux[i] = arr[i];

    let i = left, j = mid + 1;
    for (let k = left; k <= right; k++) {
        if (i > mid) {
            animations.push([j, j, false]);
            animations.push([k, aux[j], true]);
            arr[k] = aux[j++];
        } else if (j > right) {
            animations.push([i, i, false]);
            animations.push([k, aux[i], true]);
            arr[k] = aux[i++];
        } else if (aux[i] > aux[j]) {
            animations.push([i, j, false]);
            animations.push([k, aux[j], true]);
            arr[k] = aux[j++];
        } else {
            animations.push([i, j, false]);
            animations.push([k, aux[i], true]);
            arr[k] = aux[i++];
        }
    }
}


