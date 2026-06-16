export default class ListItem {
    constructor(elem, eventTarget) {
        this.elem = elem;
        this.eventTarget = eventTarget;

        console.log('ListItem constructor : ', this.eventTarget);
        // 버튼
    }

    init () {
        console.log('listItem init!!');
        $$(this.elem).find('#srchCmpny').on('click', this.handleClick.bind(this));
    }

    handleClick (e) {
        e.preventDefault();

        this.eventTarget.dispatchEvent(
            new CustomEvent('itemAction', {
                detail : {
                    id : this.elem.dataset.id,
                    action : 'click',
                    status : 'success'
                }
            })
        );
    }

    destroy () {
        super.destroy(this);
    }
}
