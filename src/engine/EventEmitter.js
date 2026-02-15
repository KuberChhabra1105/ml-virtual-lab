export class EventEmitter {
    constructor() {
        this.callbacks = {};
        this.callbacks.base = {};
    }

    on(_names, callback) {
        // Errors
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('wrong names');
            return false;
        }

        if (typeof callback === 'undefined') {
            console.warn('wrong callback');
            return false;
        }

        // Resolve names
        const names = _names.split(' ');

        // Each name
        names.forEach((_name) => {
            // Resolve name
            const name = _name.split('.');

            // Resolve name
            const baseName = name[0];
            const namespace = name.length > 1 ? name[1] : '';

            // This name does not exist yet
            if (typeof this.callbacks[baseName] === 'undefined') {
                this.callbacks[baseName] = {};
            }

            // This namespace does not exist yet
            if (typeof this.callbacks[baseName][namespace] === 'undefined') {
                this.callbacks[baseName][namespace] = [];
            }

            // Push callback
            this.callbacks[baseName][namespace].push(callback);
        });

        return this;
    }

    off(_names) {
        // Errors
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('wrong names');
            return false;
        }

        // Resolve names
        const names = _names.split(' ');

        // Each name
        names.forEach((_name) => {
            // Resolve name
            const name = _name.split('.');

            // Resolve name
            const baseName = name[0];
            const namespace = name.length > 1 ? name[1] : '';

            // Handle
            if (baseName !== '') {
                // Remove namespace
                if (namespace !== '') {
                    if (this.callbacks[baseName] && this.callbacks[baseName][namespace]) {
                        delete this.callbacks[baseName][namespace];

                        // Remove callback if empty
                        if (Object.keys(this.callbacks[baseName]).length === 0) {
                            delete this.callbacks[baseName];
                        }
                    }
                }
                // Remove specific callback
                else {
                    if (this.callbacks[baseName]) {
                        delete this.callbacks[baseName];
                    }
                }
            }
        });

        return this;
    }

    trigger(_name, _args) {
        // Errors
        if (typeof _name === 'undefined' || _name === '') {
            console.warn('wrong name');
            return false;
        }

        // Resolve name
        let finalResult = null;
        let result = null;

        // Default namespace
        const args = !(_args instanceof Array) ? [_args] : _args;
        let name = _name.split('.');
        const baseName = name[0];
        const namespace = name.length > 1 ? name[1] : '';

        // Default
        if (this.callbacks[baseName]) {
            // Resolve namespace
            if (namespace !== '') {
                if (this.callbacks[baseName][namespace]) {
                    this.callbacks[baseName][namespace].forEach(function (callback) {
                        result = callback.apply(this, args);
                        if (typeof finalResult === 'undefined') {
                            finalResult = result;
                        }
                    });
                }
            }

            // All
            else {
                for (const namespace in this.callbacks[baseName]) {
                    if (this.callbacks[baseName][namespace] instanceof Array) {
                        this.callbacks[baseName][namespace].forEach(function (callback) {
                            result = callback.apply(this, args);
                            if (typeof finalResult === 'undefined') {
                                finalResult = result;
                            }
                        });
                    }
                }
            }
        }

        return finalResult;
    }
}
