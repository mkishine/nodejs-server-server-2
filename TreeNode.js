module.exports = class TreeNode {
    constructor(values, children) {
        TreeNode.validateValues(values);
        TreeNode.validateChildren(children);
        this._values = values.slice();
        this._children = children.map(child => new TreeNode(child._values, child._children));
    }

    static validateValues(values) {
        if (!Array.isArray(values)) {
            throw new TypeError('Parameter "values" is not an array');
        }
        if (!values.every(value => (typeof value !== 'object' && typeof value !== 'function'))) {
            throw TypeError('Parameter "values" is not an array of simple types');
        }
    }
    static validateChildren(children) {
        if (!Array.isArray(children)) {
            throw TypeError('Parameter "children" is not an array');
        }
        if (!children.every(child => child instanceof TreeNode)) {
            throw TypeError('Parameter "children" is not an array of TreeNode objects');
        }
    }

    static fromObject(obj) {
        obj = obj || {};
        if (typeof obj !== 'object') {
            throw new TypeError('Parameter obj is not an object');
        }
        const values = obj.values || [];
        TreeNode.validateValues(values);

        let children = obj.children || [];
        children = children.map(child => TreeNode.fromObject(child));
        TreeNode.validateChildren(children);
        return new TreeNode(values, children);
    }

    get values() {
        return this._values.slice();
    }

    get children() {
        return this._children.map(child => new TreeNode(child._values, child._children));
    }
};
