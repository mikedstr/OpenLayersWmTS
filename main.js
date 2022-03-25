import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";

const parser = new WMTSCapabilities();
let map;

fetch(
  "https://platform.rocket-insights.net:8443/geoserver/gwc/service/wmts?request=GetCapabilities"
)
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    const result = parser.read(text);

    console.log(result);
    const options = optionsFromCapabilities(result, {
      layer: "ql_le",
      matrixSet: "ql-gridset"
    });
    console.log(options);

    map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
          opacity: 0.7
        }),
        new TileLayer({
          opacity: 1,
          source: new WMTS(options)
        })
      ],
      target: "map",
      view: new View({
        center: [19412406.33, -5050500.21],
        zoom: 5
      })
    }).catch(function (error) {
      console.log(error);
    });
  });
