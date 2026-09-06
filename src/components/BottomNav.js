import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';

const ITEMS = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'shop', label: 'Shop', icon: 'shopping-bag' },
  { key: 'emiDues', label: 'EMI Dues', icon: 'file-text' },
  { key: 'limit', label: 'Limit', icon: 'trending-up' },
  { key: 'profile', label: 'Profile', icon: 'user' },
];

export default function BottomNav({ activeKey = 'shop' }) {
  return (
    <View style={styles.bar}>
      {ITEMS.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <View key={item.key} style={styles.item}>
            <Feather
              name={item.icon}
              size={20}
              color={isActive ? colors.primary : colors.textMuted}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  label: {
    ...typography.tiny,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
