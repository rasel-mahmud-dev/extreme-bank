

/**
 * @param {number} number >= 13
 */
function uuid(digit= 10){
    let now = new Date().getTime().toString()
    let id = ""
    if(digit > 0) {
        for (let i = 0; i < Math.abs(digit - now.length); i++) {
            let a = Math.round(Math.random() * digit)
            id += a
        }
    }
    return now+""+id
}
export default uuid