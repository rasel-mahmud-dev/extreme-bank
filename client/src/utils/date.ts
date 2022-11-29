function date(time: string){
    let now = new Date(time)
    return now.toLocaleDateString() + " " + now.toLocaleTimeString()
}
export default date