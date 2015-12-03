export default class {
    static banner(msg) {
        console.log(`%c${msg.toUpperCase()}`, 'font-size: 30px; background: #222; color: #bada55;');
    }

    static debug(msg) {
        console.trace(`%c${msg}`, 'font-size: 15px; background: #222; color: #bada55;');
    }

    static network(msg) {
        console.trace(`%c${msg}`, 'font-size: 15px; background: #FDF485; color: #000;');
    }

    static err(msg) {
        console.trace(`%c${msg}`, 'font-size: 15px; background: #FDF485; color: #F00;');
    }

    static log(msg) {
        console.trace(msg);
    }

    static error(msg) {
        console.error(msg);
    }
}
