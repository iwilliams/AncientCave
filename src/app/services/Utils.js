export default class {
    static loadWorker(worker) {
        return new Worker(`./dist/workers/${worker}.js`);
    }

    static limitloop(fn, fps) {
        // Use var then = Date.now(); if you
        // don't care about targetting < IE9
        var then = new Date().getTime();

        // custom fps, otherwise fallback to 60
        fps = fps || 60;
        var interval = 1000 / fps;

        return (function loop(time){
            requestAnimationFrame(loop);

            // again, Date.now() if it's available
            var now = new Date().getTime();
            var delta = now - then;

            if (delta > interval) {
                // Update time
                // now - (delta % interval) is an improvement over just 
                // using then = now, which can end up lowering overall fps
                then = now - (delta % interval);

                // call the fn
                fn();
            }
        }(0));
    };

    static aspectHeightCalc(w2) {
        let w1 = 1920;
        let h1 = 1080;
        return h1*w2/w1;
    }

    static parseQuery(search) {
        var args = search.substring(1).split('&');

        var argsParsed = {};

        var i, arg, kvp, key, value;

        for (i=0; i < args.length; i++) {

            arg = args[i];

            if (-1 === arg.indexOf('=')) {

                argsParsed[decodeURIComponent(arg).trim()] = true;
            }
            else {

                kvp = arg.split('=');

                key = decodeURIComponent(kvp[0]).trim();

                value = decodeURIComponent(kvp[1]).trim();

                argsParsed[key] = value;
            }
        }

        return argsParsed;
    }

    // Goodenough UUID?
    // http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
    randomString(length, chars) {
        if(!chars) {
            chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }
}
