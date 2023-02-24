function getRobotBarcode(robot) {
    const {sex, id, name} = robot;

    let bits = [];

    bits[0] = sex === "male" ? 1 : 0;

    const nameId = [...[...(id + name.padEnd(26, " "))].map(str => str.charCodeAt(0).toString(2).padStart(8, "0")).join("")].map(Number);

    bits = bits.concat(nameId);
    console.log(bits);

    for (let i = 0; i < 17; i++) {
        let sum = 0;
        for (let j = 0; j < 17; j++) {
            sum += bits[i + j * 17];
        }
        bits.push(sum % 2)
    }

    const result = [];
    const chunkSize = 17;
    for (let i = 0; i < bits.length; i += chunkSize) {
        const chunk = bits.slice(i, i + chunkSize);
        result.push(chunk);
    }

    return result;
}


const barcode = getRobotBarcode({
    "sex": "female",
    "id": "0owrgqqwfw",
    "name": "Dazdraperma Petrovna"
});

const $barcode = document.querySelector(".barcode");

$barcode.innerHTML = barcode.map(row => `
<div class="row">
    ${row.map(renderCell).join("")}
</div>
`).join("");

function renderCell(x) {
    if (x) {
        return `<div class="cell black"></div>`;
    } else {
        return `<div class="cell"></div>`;
    }
}