import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import DirectoryCard from '../components/DirectoryCard';
import { spacing, typography } from '../theme';

const BRANDS = [
  { id: 'b1', name: 'Air India', logo: 'https://logo.clearbit.com/airindia.com', emi: 'No-cost EMIs upto 18 months' },
  { id: 'b2', name: 'Apple Premium Reseller', logo: 'https://logo.clearbit.com/apple.com', emi: 'No-cost EMIs upto 24 months' },
  { id: 'b3', name: 'CaratLane', logo: 'https://logo.clearbit.com/caratlane.com', emi: 'No-cost EMIs upto 6 months' },
];

export default function TopBrandsTab() {
  const [query, setQuery] = useState('');

  return (
    <View>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search online stores..." />
      <Text style={styles.sectionTitle}>Top Brands</Text>
      <FlatList
        data={BRANDS}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <DirectoryCard logo={item.logo} title={item.name} subtitle={item.emi} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    ...typography.h2,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
});
