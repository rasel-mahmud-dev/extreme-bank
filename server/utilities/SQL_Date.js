function SQL_Date(now) {
    let curr = new Date();
    if (now) {
        curr = now;
    }

    let a = new Date(curr);
    let d = a.toISOString();
    let date = d.slice(0, 10);
    let time = a.toTimeString().slice(0, 8);
    return date + " " + time;
}

export default SQL_Date;