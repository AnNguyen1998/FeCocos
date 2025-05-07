const dsThanhvien = [
    { id: 1, role: "Chuluc" },
    { id: 2, role: "Nongcot" },
    { id: 3, role: "Nongcot" },
    { id: 4, role: "Nongcot" },
    { id: 5, role: "Nongcot" },
    { id: 6, role: "Nongcot" },
    { id: 7, role: "Dubi" },
    { id: 8, role: "Dubi" },
    { id: 9, role: "Dubi" },
    { id: 10, role: "Dubi" },
    { id: 11, role: "Dubi" },
]
let baiTrung = [];
let khongtheChoi = [];
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const timdoi = (ds) => {
    const chuLuc = ds.filter(tv => tv.role == "Chuluc");
    const nongCot = ds.filter(tv => tv.role == "Nongcot");
    const duBi = ds.filter(tv => tv.role == "Dubi");
    let doihinhchinhthuc = []
    for (nc of nongCot) {
        for (db of duBi) {
            let doiHinh = [chuLuc[0].id, nc.id, db.id]
            if (kiemtraDH(doiHinh, baiTrung, khongtheChoi)) {
                doihinhchinhthuc.push(doiHinh)
            }
        }
    }
    return doihinhchinhthuc;
}
const kiemtraDH = (dh, bt, kph) => {
    let check = 0;
    for (let i = 0; i < bt.length; i++) {
        for (let j = 0; j < dh.length; j++) {
            if (dh[j] == bt[i]) {
                check += 1;
            }
        }
    }
    if (check < 2) {
        return false;
    }
    let check1 = 0;
    for (let i = 0; i < kph.length; i++) {
        for (let j = 0; j < dh.length; j++) {
            if (dh[j] == kph[i]) {
                check1 += 1;
            }
        }
    }
    if (check1 > 1) {
        return false;
    }
    return true;
}
const thaydoiDK = () => {
    rl.question("HLV co thay doi dieu kien ? ", (choice) => {
        if (choice == 'n') {
            console.log("Danh sach cac doi thoa man Yeu cau: ",timdoi(dsThanhvien));
            rl.close();
        }
        if (choice == 'y') {
            handleDH();
        }
    })
}
const handleDH = ()=>{
rl.question("ID Nguoi co the choi cung thu 1: ", (cauthu1) => {
    rl.question("ID Nguoi co the choi cung thu 2: ", (cauthu2) => {
        rl.question("ID nguoi khong the choi cung thu 1: ", (cauthu3) => {
            rl.question("ID nguoi khong the choi cung thu 2: ", (cauthu4) => {
                baiTrung.push(parseInt(cauthu1), parseInt(cauthu2))
                console.log("Cap bai trung: ", baiTrung);
                khongtheChoi.push(parseInt(cauthu3), parseInt(cauthu4));
                console.log("khong the choi cung: ", khongtheChoi);
                thaydoiDK();
            })
        })
    })
})
}
handleDH();