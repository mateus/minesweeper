import MapBuilder from './map-builder';
import Sidebar from './sidebar';

window.minesweeperMap = new MapBuilder('small');
// new MapBuilder();
// new MapBuilder('large');

console.log(window.minesweeperMap);

new Sidebar();
