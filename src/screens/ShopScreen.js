import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeroBanner from '../components/HeroBanner';
import TabSelector from '../components/TabSelector';
import BottomNav from '../components/BottomNav';
import TopBrandsTab from './TopBrandsTab';
import NearbyStoresTab from './NearbyStoresTab';
import MarketplaceTab from './MarketplaceTab';
import { colors, spacing } from '../theme';

const TABS = [
  { key: 'topBrands', label: 'Top Brands' },
  { key: 'nearbyStores', label: 'Nearby Stores' },
  { key: 'marketplace', label: 'Marketplace' }, 
];

export default function ShopScreen() {
  const [activeTab, setActiveTab] = useState('topBrands');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroBanner />

          <View style={styles.content}>
          <View style={styles.tabWrapper}>
            <TabSelector tabs={TABS} activeKey={activeTab} onChange={setActiveTab} />
          </View>
          <View style={styles.tabContent}>
            {activeTab === 'topBrands' && <TopBrandsTab />}
            {activeTab === 'nearbyStores' && <NearbyStoresTab />}
            {activeTab === 'marketplace' && <MarketplaceTab />}
          </View>
        </View>
      </ScrollView>
      <BottomNav activeKey="shop" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  tabWrapper: {
    marginTop: -spacing.xxl, 
  },
  tabContent: {
  marginTop: spacing.md,
},
});
