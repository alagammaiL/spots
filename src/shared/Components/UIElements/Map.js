import "./Map.css";
import { useEffect, useRef } from "react";

export default function Map(props) {
  const mapRef = useRef(null);
  const { center, zoom } = props;
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${props.className}`}></div>;
}
