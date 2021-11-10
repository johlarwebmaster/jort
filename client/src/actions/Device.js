export default function CheckDevice() {
    let check = false
    let device = window.navigator.userAgent
    let result = device.search(/iphone|android/i)
    if (result !== -1) {
        check = true
        return check
    }
    return check
}