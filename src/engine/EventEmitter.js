export class EventEmitter {
    constructor() {
        this.callbacks = {};
        this.callbacks.base = {};
    }

    on(_names, callback) {
        const names = _names.split(' ');
        names.forEach((_name) => {
            const name = _name.split('.');
            const baseName = name[0];
            const namespace = name.length > 1 ? name[1] : '';

            if (typeof this.callbacks[baseName] === 'undefined') {
                this.callbacks[baseName] = {};
            }
            if (typeof this.callbacks[baseName][namespace] === 'undefined') {
                this.callbacks[baseName][namespace] = [];
            }
            this.callbacks[baseName][namespace].push(callback);
        });
        return this;
    }

    trigger(_name, _args) {
        const args = !(_args instanceof Array) ? [_args] : _args;
        let name = _name.split('.');
        const baseName = name[0];
        const namespace = name.length > 1 ? name[1] : '';

        if (this.callbacks[baseName]) {
            if (namespace !== '') {
                if (this.callbacks[baseName][namespace]) {
                    this.callbacks[baseName][namespace].forEach(function (callback) {
                        callback.apply(this, args);
                    });
                }
            } else {
                for (const namespace in this.callbacks[baseName]) {
                    if (this.callbacks[baseName][namespace] instanceof Array) {
                        this.callbacks[baseName][namespace].forEach(function (callback) {
                            callback.apply(this, args);
                        });
                    }
                }
            }
        }
    }
}