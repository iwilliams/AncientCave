export default class {
    static banner(msg) {
        console.log(`%c${msg.toUpperCase()}`, 'font-size: 30px; background: #222; color: #bada55;');
    }

    static log(msg) {
        console.log(msg);
    }

    static error(msg) {
        console.error(msg);
    }
}
