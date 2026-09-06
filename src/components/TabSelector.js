import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography, shadow } from '../theme';

export default function TabSelector({ tabs, activeKey, onChange }) {
  return (
    <View style={styles.track}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.segment, isActive && styles.segmentActive]}
            onPress={() => onChange(tab.key)}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.label, isActive && styles.labelActive]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
            {isActive && <View style={styles.underline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderRadius: radii.pill,
    padding: 6,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.pill,
  },
  segmentActive: {
    backgroundColor: colors.surface,
    ...shadow.card,
  },
  label: {
    ...typography.captionBold,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  underline: {
    marginTop: 3,
    height: 2,
    width: 20,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
});
