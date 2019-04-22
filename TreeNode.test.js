const TreeNode = require('./TreeNode');


describe('constructors', () => {
    describe('invalid', () => {
        test('empty constructor', () => {
            expect(() => {
                new TreeNode()
            }).toThrowError(new TypeError('Parameter "values" is not an array'));
        });
        test('invalid values - not an array', () => {
            expect(() => {
                new TreeNode('')
            }).toThrowError(new TypeError('Parameter "values" is not an array'));
        });
        test('invalid values - array of objects', () => {
            expect(() => {
                new TreeNode([{}, {}])
            }).toThrowError(new TypeError('Parameter "values" is not an array of simple types'));
        });
        test('invalid values - array of nulls', () => {
            expect(() => {
                new TreeNode([null, null])
            }).toThrowError(new TypeError('Parameter "values" is not an array of simple types'));
        });
        test('invalid values - array of functions', () => {
            expect(() => {
                new TreeNode([() => 1, () => 2])
            }).toThrowError(new TypeError('Parameter "values" is not an array of simple types'));
        });
        test('invalid children', () => {
            expect(() => {
                new TreeNode([], '')
            }).toThrowError(new TypeError('Parameter "children" is not an array'));
        });
        test('invalid type of children', () => {
            expect(() => {
                new TreeNode([], [''])
            }).toThrowError(new TypeError('Parameter "children" is not an array of TreeNode objects'));
        });
    });
    describe('valid', () => {
        test('empty node', () => {
            expect(new TreeNode([], [])).not.toBeNull();
        });
        test('node with values', () => {
            // given
            const n1 = new TreeNode([3, 4], []);
            const n2 = new TreeNode([5, 6], []);
            // when
            const n = new TreeNode([1, 2], [n1, n2]);
            // then
            expect(n.values).toEqual([1, 2]);
            expect(n.children[0]).toBeInstanceOf(TreeNode);
            expect(n.children[0]).not.toBe(n1);
            expect(n.children[0]).toEqual(n1);
        });
    });
});

describe('fromNode', () => {
    describe('invalid', () => {
        test('primitive type object', () => {
            expect(() => {
                TreeNode.fromObject(true)
            }).toThrowError(new TypeError('Parameter obj is not an object'));
        });
        test('function type object', () => {
            expect(() => {
                TreeNode.fromObject(() => 1)
            }).toThrowError(new TypeError('Parameter obj is not an object'));
        });
    });
    describe('valid', () => {
        describe('empty node', () => {
            let emptyNode;
            beforeEach(() => {
                emptyNode = new TreeNode([], []);
            });
            test('fully defined', () => {
                expect(TreeNode.fromObject({values: [], children: []})).toEqual(emptyNode);
            });
            test('missing object', () => {
                expect(TreeNode.fromObject()).toEqual(emptyNode);
            });
            test('null object', () => {
                expect(TreeNode.fromObject(null)).toEqual(emptyNode);
            });
            test('empty object', () => {
                expect(TreeNode.fromObject({})).toEqual(emptyNode);
            });
            test('missing values key', () => {
                expect(TreeNode.fromObject({children: []})).toEqual(emptyNode);
            });
            test('missing children key', () => {
                expect(TreeNode.fromObject({values: []})).toEqual(emptyNode);
            });
        });
        describe('non-empty node', () => {
            test('values only', () => {
                expect(TreeNode.fromObject({values: [1, 2, 3]}))
                    .toEqual({_values: [1, 2, 3], _children: []});
            });
            test('children only', () => {
                // given
                const inputObj = {
                    children: [
                        {
                            values: [
                                1, 2, 3
                            ]
                        }
                    ]
                };
                // when
                const node = TreeNode.fromObject(inputObj);
                // then
                const expected = {
                    _values: [],
                    _children: [
                        {
                            _values: [
                                1, 2, 3
                            ],
                            _children: []
                        }
                    ]
                };
                const actual = JSON.parse(JSON.stringify(node));
                expect(actual).toEqual(expected);
            });
            test('values and children', () => {
                // given
                const inputObj = {
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
                // when
                const node = TreeNode.fromObject(inputObj);
                // then
                const expected = {
                    _values: [
                        1,
                        2
                    ],
                    _children: [
                        {
                            _values: [
                                3,
                                4
                            ],
                            _children: []
                        },
                        {
                            _values: [
                                5,
                                6
                            ],
                            _children: [
                                {
                                    _values: [
                                        7,
                                        8
                                    ],
                                    _children: []
                                }
                            ]
                        }
                    ]
                };
                const actual = JSON.parse(JSON.stringify(node));
                expect(actual).toEqual(expected);
            });
        });
    });
});