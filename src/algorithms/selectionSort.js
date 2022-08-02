export default function selectionSort(arr) {
    const arrCopy = [...arr], animations = [];

    for (let i = 0; i < arrCopy.length; i++) {
        let minIndex = i, minVal = arrCopy[i];

        for (let j = i + 1; j < arrCopy.length; j++) {
            animations.push([minIndex, j, false]);

            if (arrCopy[j] < minVal) {
                minIndex = j;
                minVal = arrCopy[j];
            }
        }

        animations.push([i, minIndex, false]);
        animations.push([i, arrCopy[minIndex], true]);
        animations.push([minIndex, arrCopy[i], true]);
        
        [arrCopy[i], arrCopy[minIndex]] = [minVal, arrCopy[i]];
    }

    return animations;
}