//Запускал код на node v16.16.0



//Решение, приведенное автором задания
const fn = function(weights) {
    weights = [...weights];
    const maximumTwo = (arr) => {
        let max1 = arr[0];
        let max2 = arr[1];
        let max1I = 0;
        let max2I = 1;
        for(let i = 2; i < arr.length; i++) {
            if (arr[i] > max1) {
                if (max1 > max2) {
                    max2 = arr[i];
                    max2I = i;
                } else {
                    max1 = arr[i];
                    max1I = i;
                }
            } else if (arr[i] > max2) {
                max2 = arr[i];
                max2I = i;
            }
        }

        if (max1 > max2) return [max2, max1, max2I, max1I];
        return [max1, max2, max1I, max2I];
    };

    if (weights.length <= 1) {
        return weights[0];
    }

    do {
        const [x, y, xI, yI] =  maximumTwo(weights);
        if (x === 0) {
            return y;
        }

        weights[xI] = 0;
        weights[yI] = y - x;

    } while(true);
};


//Мое решение
const findLatestWeight2 = function (weights) {
    weights = [...weights];
    while(weights.length >= 2) {
        const maxIndex1 = maxIndex(weights);
        const max1 = weights.splice(maxIndex1, 1);
        const maxIndex2 = maxIndex(weights);
        const max2 = weights.splice(maxIndex2, 1);

        const diff = max1 - max2;
        if(diff > 0) {
            weights.push(diff);
        }
    }
    return weights[0] || 0;

    function maxIndex(arr) {
        let max = Number.MIN_VALUE;
        let maxIndex;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] > max) {
                max = arr[i];
                maxIndex = i;
            }
        }
        return maxIndex;
    }
}

function execTime(fn) {
    const start = Date.now();
    fn();
    console.log("Time: " + (Date.now() - start));
}

const test10000 = [...new Array(10000)].map(_ => Math.floor(Math.random() * 100));


execTime(() => console.log(fn(test10000)));
execTime(() => console.log(findLatestWeight2(test10000)));

