const html1 = `<table>
    <colgroup>
        <col align="right" />
        <col />
        <col align="center" />
    </colgroup>
    <thead>
        <tr>
            <td>Command         </td>
            <td>Description     </td>
            <th>Is implemented  </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>git status</th>
            <td>List all new or modified    files</td>
            <th>Yes</th>
        </tr>
        <tr>
            <th>git diff</th>
            <td>Show file differences that haven't been
 staged</td>
            <td>No</td>
        </tr>
    </tbody>
</table>`;

function solution(html) {
    const $container = document.createElement("div");
    $container.innerHTML = html;

    let resultMd = "";
    const $table = $container.querySelector("table");
    const rows = [...$table.querySelectorAll("tr")];

    resultMd += toMdRow(trToContentArray(rows[0]));

    resultMd += toMdRow([...$table.querySelectorAll("colgroup col")].map(x => x.align || "left").map(toMdAlign));

    rows.slice(1)
        .forEach($tr => {
            resultMd += toMdRow(trToContentArray($tr));
        });
    return resultMd;
}

function toMdRow(array) {
    return "| " + array.map(x => x.trim().replace(/\n/gi, " ").replace(/ +/gi," ")).join(" | ") + " |\n"
}

function trToContentArray($tr) {
    return [...$tr.querySelectorAll("*")]
        .filter($el => $el.tagName === "TD" || $el.tagName === "TH")
        .map(x => x.tagName === "TH" ? "**" + x.innerText + "**" : x.innerText)
}

function toMdAlign(align) {
    const mdAligns = {
        "left": ":---",
        "center": ":---:",
        "right": "---:"
    };
    if (!mdAligns[align]) throw "No align " + align;
    return mdAligns[align];
}

console.log(
    solution(html1)
)
