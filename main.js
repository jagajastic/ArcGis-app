/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "./style.css";
import "@arcgis/map-components/dist/components/arcgis-layer-list";
import "@arcgis/map-components/dist/components/arcgis-map";

// calcite-navigation, calcite-navigation-logo, and calcite-shell 
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-shell";

// Import the setAssetPath function from calcite-components
// This function allows you to set the path to the calcite components assets
import { setAssetPath } from "@esri/calcite-components/dist/components";
// CDN hosted calcite components assets
setAssetPath("https://js.arcgis.com/calcite-components/2.11.1/assets");


// Get a reference to the arcgis-layer-list element
const arcgisLayerList = document.querySelector("arcgis-layer-list");


// Set the listItemCreatedFunction to add a legend to each list item
arcgisLayerList.listItemCreatedFunction = (event) => {
    const { item } = event;
    if (item.layer.type !== "group") {
      item.panel = {
        content: "legend"
      };
    }
  };
  

  // Get a reference to the arcgis-map element
const arcgisMap = document.querySelector("arcgis-map");

// Since we are using property values from the map component,
// we use the arcgisViewReadyChange event to determine when the map is ready.
arcgisMap.addEventListener("arcgisViewReadyChange", () => {

    const { portalItem } = arcgisMap.map;
    const navigationLogo = document.querySelector("calcite-navigation-logo");
  navigationLogo.heading = portalItem.title;
  navigationLogo.description = portalItem.snippet;
  navigationLogo.thumbnail = portalItem.thumbnailUrl;

});

const layer = arcgisMap.map.layers.find((layer) => layer.id === "Accidental_Deaths_8938");

layer.popupTemplate.title = "Accidental Deaths";