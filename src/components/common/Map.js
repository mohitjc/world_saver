import React, { useEffect, useRef, useState } from 'react';

const GMap = ({ markerList }) => {

  const googleMapRef = useRef(null);
  let googleMap = null;

  const [center, setCenter] = useState({ lat: 37.0902, lng: 95.7129 })

  function getTextContent(x) {
    if (x.id) {
      return `<a href="/journey/${x.slug}"><i>View Journey</i></a><br><b>Journey Name:</b> ${x.name} <br><b>Address:</b> ${x.address}`;
    } else {
      return `<b>Journey Name:</b> ${x.name} <br><b>Address:</b> ${x.address}`;
    }
  }

  useEffect(() => {
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();

    if (markerList && markerList.length) {
      markerList.map((x) => {
        const marker = createMarker(x);
        bounds.extend(marker.position);
        // setCenter({ lat: x.lat, lng: x.lng });
        const infowindow = new window.google.maps.InfoWindow({
          content: getTextContent(x),
        });
        marker.addListener('click', () => {
          infowindow.open(googleMap, marker);
          // setCenter({ lat: x.lat, lng: x.lng });
        });
      });

      setCenter(bounds.getCenter())
      googleMap.fitBounds(bounds); // the map to contain all markers
    }
  }, [markerList]);

  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: center,
      zoom: 8,
      maxZoom: 10,
    });
  };

  // create marker on google map

  const createMarker = (itm) =>
    new window.google.maps.Marker({
      position: { lat: itm.lat, lng: itm.lng },
      map: googleMap,
      title: itm.name,
      icon: {
        // url: markerObj.icon,
        // set marker width and height
        scaledSize: new window.google.maps.Size(50, 50),
      },

    });


  return <div ref={googleMapRef} style={{ height: 300 }} />;
};

export default GMap;
