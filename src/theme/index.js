export const colors = {
  primary: '#280F97', // 1Fi brand purple (matches meta theme-color on 1fi.in)
  primaryLight: '#f5f0ff', // pill/tag background, inactive tab track
  primaryDark: '#5620AD',

  background: '#F5F5F7', // page background behind the white cards
  surface: '#FFFFFF', // card background
  surfaceAlt: '#FAFAFA',

  textPrimary: '#111827', // bold titles
  textSecondary: '#6B7280', // gray subtitles / descriptions
  textMuted: '#9CA3AF',
  textOnPrimary: '#FFFFFF',

  border: '#EDEDF2',
  chipBackground: '#F1F0F5', // distance / tag pills
  success: '#16A34A',
  error: '#DC2626',
  warning: '#D97706',

  overlay: 'rgba(17, 17, 17, 0.45)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 26, fontWeight: '800', color: colors.textPrimary },
  h2: { fontSize: 20, fontWeight: '700', color: colors.textPrimary },
  h3: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },
  body: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },
  bodyBold: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  caption: { fontSize: 13, fontWeight: '400', color: colors.textSecondary },
  captionBold: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  tiny: { fontSize: 11, fontWeight: '500', color: colors.textSecondary },
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 800, height: 400 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
};

export default { colors, spacing, radii, typography, shadow };
