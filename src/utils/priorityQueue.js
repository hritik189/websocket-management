export class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sort();
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift().element;
    }

    sort() {
        this.queue.sort((a, b) => b.priority - a.priority);
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}