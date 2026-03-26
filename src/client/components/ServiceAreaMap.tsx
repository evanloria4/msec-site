import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

type Location = {
  name: string;
  note?: string;
  lat: number;
  lng: number;
  labelDirection?: 'top' | 'bottom' | 'left' | 'right';
  labelOffset?: [number, number];
};

type ServiceAreaMapProps = {
  locations: Location[];
};

export default function ServiceAreaMap({ locations }: ServiceAreaMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let map: ReturnType<(typeof import('leaflet'))['map']>;

    import('leaflet').then((leaflet) => {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      // Fix default marker icons broken by webpack
      delete (
        leaflet.Icon.Default.prototype as unknown as Record<string, unknown>
      )._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      map = leaflet.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        })
        .addTo(map);

      const bounds: [number, number][] = [];

      locations.forEach((loc) => {
        bounds.push([loc.lat, loc.lng]);

        // Service area circle (roughly 8-mile radius)
        leaflet
          .circle([loc.lat, loc.lng], {
            radius: 12000,
            color: '#2563eb',
            fillColor: '#3b82f6',
            fillOpacity: 0.12,
            weight: 1.5,
            opacity: 0.5,
          })
          .addTo(map);

        // Custom blue marker
        const marker = leaflet
          .circleMarker([loc.lat, loc.lng], {
            radius: 7,
            color: '#1d4ed8',
            fillColor: '#2563eb',
            fillOpacity: 1,
            weight: 2,
          })
          .addTo(map);

        marker.bindPopup(
          `<div style="font-family:sans-serif;font-size:13px;font-weight:700;color:#1e293b">${loc.name}</div>` +
            (loc.note
              ? `<div style="font-size:11px;color:#64748b;margin-top:2px">${loc.note}</div>`
              : '')
        );

        // City label
        leaflet
          .tooltip({
            permanent: true,
            direction: loc.labelDirection ?? 'top',
            offset: loc.labelOffset ?? [0, -10],
            className: 'map-city-label',
          })
          .setContent(loc.name.replace(', LA', ''))
          .setLatLng([loc.lat, loc.lng])
          .addTo(map);
      });

      if (bounds.length > 0) {
        // Autodetect where the map should set view
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <style>{`
        .map-city-label {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          color: #1e3a5f !important;
          white-space: nowrap !important;
          text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
        }
        .map-city-label::before {
          display: none !important;
        }
      `}</style>
      <div
        ref={mapContainerRef}
        className="h-full w-full"
        style={{ minHeight: '300px' }}
      />
    </>
  );
}
