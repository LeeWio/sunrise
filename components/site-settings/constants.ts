import { AppTheme } from '@/lib/features/settings/theme-slice';
import { Language } from '@/lib/features/settings/language-slice';

export const THEMES: { id: AppTheme; label: string }[] = [
  { id: 'light', label: 'Default Light' },
  { id: 'dark', label: 'Default Dark' },
  { id: 'airbnb-light', label: 'Airbnb Light' },
  { id: 'airbnb-dark', label: 'Airbnb Dark' },
  { id: 'coinbase-light', label: 'Coinbase Light' },
  { id: 'coinbase-dark', label: 'Coinbase Dark' },
  { id: 'discord-light', label: 'Discord Light' },
  { id: 'discord-dark', label: 'Discord Dark' },
  { id: 'lavender-light', label: 'Lavender Light' },
  { id: 'lavender-dark', label: 'Lavender Dark' },
  { id: 'mint-light', label: 'Mint Light' },
  { id: 'mint-dark', label: 'Mint Dark' },
  { id: 'netflix-light', label: 'Netflix Light' },
  { id: 'netflix-dark', label: 'Netflix Dark' },
  { id: 'rabbit-light', label: 'Rabbit Light' },
  { id: 'rabbit-dark', label: 'Rabbit Dark' },
  { id: 'sky-light', label: 'Sky Light' },
  { id: 'sky-dark', label: 'Sky Dark' },
  { id: 'spotify-light', label: 'Spotify Light' },
  { id: 'spotify-dark', label: 'Spotify Dark' },
  { id: 'uber-light', label: 'Uber Light' },
  { id: 'uber-dark', label: 'Uber Dark' },
];

export const LANGUAGES: { id: Language; label: string }[] = [
  { id: 'zh-CN', label: '简体中文' },
  { id: 'en-US', label: 'English' },
];
