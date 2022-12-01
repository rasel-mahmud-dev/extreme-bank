function date(now) {
    let curr = new Date();
    if (now) {
        curr = now;
    }
    return new Date(curr)
}

export default date;