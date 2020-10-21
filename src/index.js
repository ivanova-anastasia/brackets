module.exports = function check(str, bracketsConfig) {
    let brackets = bracketsConfig.flat();
    let stack = [];
    let sameBracketsObjArr = bracketsConfig
        .filter((subArr) => subArr.every((v) => v === subArr[0]))
        .reduce((objectArr, oldArr) => {
            let value = Array.from(oldArr)[0];
            objectArr.push({ conf: value, value: false });
            return objectArr;
        }, []);

    for (let bracket of str) {
        let bracketsIndex = brackets.indexOf(bracket);

        if (bracketsIndex === -1) {
            return false;
        }

        if (bracketsIndex !== brackets.lastIndexOf(bracket)) {
            sameBracketsObjArr.forEach((item, i) => {
                if (item.conf == bracket) {
                    if (item.value) {
                        bracketsIndex++;
                        item.value = false;
                    } else {
                        item.value = true;
                    }
                }
            });
        }

        if (bracketsIndex % 2 === 0) {
            stack.push(bracketsIndex + 1);
        } else {
            if (stack.pop() !== bracketsIndex) {
                return false;
            }
        }
    }
    return stack.length === 0;
};
