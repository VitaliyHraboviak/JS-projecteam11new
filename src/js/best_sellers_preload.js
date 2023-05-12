import { Loading } from 'notiflix/build/notiflix-loading-aio';

preLoadPageWait();

window.onload = function () {
  Loading.remove(1500);
};

export function preLoadPageWait() {
  Loading.standard({
    clickToClose: true,
    svgSize: '60px',
    backgroundColor: 'rgba(0,0,0,0.5)',
  });
}
export function removeLoad() {
  window.onload = function () {
    Loading.remove();
  };
}
