export default function bubbleSort(arr) {
    const arrCopy = [...arr], animations = [];
    let n = arr.length;

    while (true) {
        let swapped = false;

        for (let i = 1; i < n; i++) {
            animations.push([i - 1, i, false]);

            if (arrCopy[i - 1] > arrCopy[i]) {
                animations.push([i - 1, arrCopy[i], true]);
                animations.push([i, arrCopy[i - 1], true]);

                [arrCopy[i - 1], arrCopy[i]] = [arrCopy[i], arrCopy[i - 1]];
                swapped = true;
            } 
        }
        
        n--;

        if (!swapped) break;
    }

    return animations;
}