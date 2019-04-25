'use strict';

exports.getTree = function (name) {
    return new Promise(function (resolve) {
        const example = {
            values: [
                1, 2
            ],
            children: [
                {
                    values: [
                        3, 4
                    ]
                },
                {
                    values: [
                        5, 6
                    ],
                    children: [
                        {
                            values: [
                                7, 8
                            ]
                        }
                    ]
                },
            ]
        };
        resolve(example);
    });
};

