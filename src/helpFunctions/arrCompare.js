export default function arrCompare(array1, array2) {
    const same =
        array1.length === array2.length &&
        array1.every((element, index) => {
            return element === array2[index];
        });
    return same;
}
