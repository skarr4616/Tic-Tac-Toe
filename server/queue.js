class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
        this.sz = 0;
    }

    push(item) {
        this.items[this.backIndex] = item;
        this.backIndex++;
        this.sz++;
    }

    pop() {
        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        this.sz--;
        return item;
    }

    front() {
        return this.items[this.frontIndex];
    }

    size() {
        return this.sz;
    }
}

export default Queue;
