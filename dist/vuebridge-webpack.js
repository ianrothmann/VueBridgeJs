'use strict';

var _require = require('laravel-mix'),
    mix = _require.mix;

var read_dir_rec = require('fs-readdir-recursive');

function mixViews() {
    var pageSrc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'resources/assets/js/views/';
    var pageDest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public/js/views/';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = read_dir_rec(pageSrc)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var file = _step.value;

            if (file.endsWith('.js')) {
                if (mix.config.inProduction) {
                    mix.babel(pageSrc + file, pageDest + file).version();
                } else {
                    mix.babel(pageSrc + file, pageDest + file);
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

module.exports.mixViews = mixViews;