import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import DirectoryCard from '../components/DirectoryCard';
import { colors, spacing, typography } from '../theme';

const STORES = [
  { id: 's1', name: 'TripBouquet', logo: 'https://logo.clearbit.com/tripbouquet.com', address: '241, Tower B, Spazedge, near Dmart, Gurugram, Haryana, 122018', distance: '364 KM' },
  { id: 's2', name: 'Charger On Wheels', logo: 'https://logo.clearbit.com/chargeronwheels.com', address: 'Orchid Business Park, Near Subhash Chowk, Gurugram, Haryana, 122101', distance: '365 KM' },
  { id: 's3', name: 'Ashoka Suzuki', logo: 'https://logo.clearbit.com/suzuki.com', address: 'Khata No 271, 316, Badshahpur Sohna Rd, Gurugram, Haryana, 122001', distance: '366 KM' },
];

export default function NearbyStoresTab() {
  const [query, setQuery] = useState('');

  return (
    <View>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search stores..." />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby Stores</Text>
        <View style={styles.locationChip}>
          <Text style={styles.locationText}>Jhansi \u25BE</Text>
        </View>
      </View>
      <FlatList
        data={STORES}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <DirectoryCard
            logo={item.logo}
            title={item.name}
            subtitle={item.address}
            trailing={item.distance}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
  },
  locationChip: {
    backgroundColor: colors.primaryLight,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  locationText: {
    ...typography.captionBold,
    color: colors.primary,
  },
});
