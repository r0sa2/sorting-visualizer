export default function insertionSort(arr) {
    const arrCopy = [...arr], animations = [];

    for (let i = 1; i < arrCopy.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            animations.push([j, j + 1, false]);

            if (arrCopy[j + 1] < arrCopy[j]) {
                animations.push([j, arrCopy[j + 1], true]);
                animations.push([j + 1, arrCopy[j], true]);
                
                [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
            } else {
                break;
            }
        }
    }

    return animations;
}