import { config } from '@/config';

export const MAPBOX_ACCESS_TOKEN = config.mapbox.accessToken;
export const MAPBOX_STYLE = config.mapbox.style;
export const DEFAULT_CENTER = config.mapbox.defaultCenter;
export const DEFAULT_ZOOM = config.mapbox.defaultZoom;

export const MAP_SETTINGS = {
  maxZoom: 18,
  minZoom: 3,
  attributionControl: false,
  logoPosition: 'bottom-left' as const,
} as const;
