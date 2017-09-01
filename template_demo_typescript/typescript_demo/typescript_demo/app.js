"use strict";
var Greeter = /** @class */ (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
        return;
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = window.setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
        return;
    };
    Greeter.prototype.stop = function () {
        window.clearTimeout(this.timerToken);
        return;
    };
    return Greeter;
}());
(function () {
    var _debug_flag = false;
    var _demo_name = "TypeScript Demo Template";
    try {
        console.info("BEGIN", _demo_name);
        window.document.addEventListener("DOMContentLoaded", function (ev) {
            console.debug("DOMContentLoaded.");
            var el = document.getElementById('content');
            var greeter = new Greeter(el);
            greeter.start();
            return;
        });
    }
    catch (ex) {
        console.error("Exception", _demo_name);
        console.error(ex.number, ":", ex.name, ":", ex.message);
        console.error("stack::", ex.stack);
        return;
    }
    finally {
        console.info("END", _demo_name);
    }
    return;
})();
//# sourceMappingURL=app.js.map