export default function quickSort(arr) {
    const arrCopy = [...arr], animations = [];

    quickSortHelper(arrCopy, 0, arr.length - 1, animations);

    return animations;
}

function quickSortHelper(arr, left, right, animations) {
    if (left >= right) return;

    let index = partition(arr, left, right, animations);

    quickSortHelper(arr, left, index - 1, animations);
    quickSortHelper(arr, index + 1, right, animations);
}

function partition(arr, left, right, animations) {
    let pivot = arr[right], i = left - 1;

    for (let j = left; j <= right - 1; j++) {
        animations.push([j, right, false]);

        if (arr[j] < pivot) {
            i++;

            animations.push([i, j, false]);
            animations.push([i, arr[j], true]);
            animations.push([j, arr[i], true]);

            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    animations.push([i + 1, right, false]);
    animations.push([i + 1, arr[right], true]);
    animations.push([right, arr[i + 1], true]);

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];

    return i + 1;
}