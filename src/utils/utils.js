export let getChinatime = (utctime) => {

    let date = new Date(utctime)

    return date.getFullYear() + '-' +p((date.getMonth() + 1))  + '-' + p(date.getDate()) + ' ' +p(date.getHours())  + ":" + p(date.getMinutes()) + ":" + p(date.getSeconds())
}
export let getTimer = (utctime) => {

    let date = new Date(utctime)

    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}
function p(s) {
    return s < 10 ? '0' + s: s;
}