
class TreeNode {
    constructor(id, title, description, dueDate, progressStatus) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.progressStatus = progressStatus;
        this.children = [];
    }

    addChild(val) {
        this.children.push(new TreeNode(val));
    }

    removeChild(val) {
        this.children = this.children.filter(child => child.val !== val);
    }
}

module.exports = TreeNode;
