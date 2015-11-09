export default class {

    constructor(xPos, yPos) {
        this.xPos = xPos || 0;
        this.yPos = yPos || 0;
        this.isVisible = true;
    }

    render(ctx, frame) {
        if(this.isVisible)
            this.renderer.render(ctx, frame);
    }

    hide() {
        this.isVisible = false;
    }

    show() {
        this.isVisible = true;
    }

    toggle() {
        this.isVisible = !this.isVisible;
    }

    tick() {
        return;
    }
}
