/**
 * Custom directives
 */
import { addClass, removeClass } from './helpers';

let mouseoverHandler = function(event) {
  let span = event.target.parentNode.getElementsByTagName('span')[0];
  addClass(span, 'tooltip-show');
}
let mouseoutHandler = function(event) {
  let span = event.target.parentNode.getElementsByTagName('span')[0];
  removeClass(span, 'tooltip-show');
}

export default {
  install(Vue) {
    Vue.directive('tooltip', {
      bind: function(el, bindings) {
        let span = document.createElement('span');
        let text = document.createTextNode(`Seats available: ${bindings.value.seats}`);
        span.appendChild(text);
        addClass(span, 'tooltip');
        el.appendChild(span);
        let div = el.getElementsByTagName('div')[0];
        div.addEventListener('mouseover', mouseoverHandler);
        div.addEventListener('mouseout', mouseoutHandler);
        div.addEventListener('touchstart', mouseoverHandler);
        div.addEventListener('touchend', mouseoutHandler);
      },
      unbind: function(el, bindings) {
        let div = el.getElementsByTagName('div')[0];
        div.removeEventListener('mouseover', mouseoverHandler);
        div.removeEventListener('mouseout', mouseoutHandler);
        div.removeEventListener('touchstart', mouseoverHandler);
        div.removeEventListener('touchend', mouseoutHandler);
      }
    });
  }
}