class Slider {
  constructor({container, cycle = 3000} = {}) {
    this.container = container;
    this.items = Array.from(container.querySelectorAll('.slider__item, .slider__item--selected'));
    this.cycle = cycle;

    const controller = this.container.querySelector('.slider__control');
    const buttons = controller.querySelectorAll('.slider__control-buttons, .slider__control-buttons--selected');

    controller.addEventListener('mouseover', (evt) => {
      const idx = Array.from(buttons).indexOf(evt.target);
      if (idx >= 0) {
        this.slideTo(idx);
        this.stop();
      }
    });

    controller.addEventListener('mouseout', (evt) => {
      this.start();
    });

    /*
      注册slide事件，将选中的图片和小圆点设置为selected状态
    */
    this.container.addEventListener('slide', (evt) => {
      const idx = evt.detail.index;
      const selected = controller.querySelector('.slider__control-buttons--selected');
      if (selected) selected.className = 'slider__control-buttons';
      buttons[idx].className = 'slider__control-buttons--selected';
    });

    const previous = this.container.querySelector('.slider__previous');
    previous.addEventListener('click', (evt) => {
      this.stop();
      this.slidePrevious();
      this.start();
      evt.preventDefault();
    });

    const next = this.container.querySelector('.slider__next');
    next.addEventListener('click', (evt) => {
      this.stop();
      this.slideNext();
      this.start();
      evt.preventDefault();
    });
  }

  start() {
    this.stop();
    this._timer = setInterval(() => this.slideNext(), this.cycle);
  }

  stop() {
    clearInterval(this._timer);
  }

  /*
    通过选择器`.slider__item--selected`获得被选中的元素
  */
  getSelectedItem() {
    const selected = this.container.querySelector('.slider__item--selected');
    return selected;
  }

  /*
    返回选中的元素在items数组中的位置。
  */
  getSelectedItemIndex() {
    return this.items.indexOf(this.getSelectedItem());
  }

  // 加入自定义事件触发
  slideTo(idx) {
    const selected = this.getSelectedItem();
    if (selected) {
      selected.className = 'slider__item';
    }
    const item = this.items[idx];
    if (item) {
      item.className = 'slider__item--selected';
    }

    const detail = {index: idx};
    const event = new CustomEvent('slide', {bubbles: true, detail});
    this.container.dispatchEvent(event);
  }

  /*
    将下一张图片标记为选中状态
  */
  slideNext() {
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }

  /*
    将上一张图片标记为选中状态
  */
  slidePrevious() {
    const currentIdx = this.getSelectedItemIndex();
    const previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);
  }
}
