import L from 'leaflet';

// 修复Leaflet默认图标路径问题
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: import('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: import('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: import('leaflet/dist/images/marker-shadow.png').default,
});
