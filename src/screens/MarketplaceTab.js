import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { LoadingState, ErrorState, EmptyState } from '../components/AsyncStates';
import { fetchProducts } from '../api/marketplaceApi';
import { spacing, typography } from '../theme';

// Debounce so we don't refetch on every keystroke.
function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(handle);
  }, [value, delayMs]);
  return debounced;
}

export default function MarketplaceTab() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 350);

  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const load = useCallback(async (searchQuery) => {
    setStatus('loading');
    try {
      const results = await fetchProducts({ query: searchQuery });
      setProducts(results);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load(debouncedQuery);
  }, [debouncedQuery, load]);

  return (
    <View>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search products..." />
      <Text style={styles.sectionTitle}>1Fi Marketplace</Text>

      {status === 'loading' && <LoadingState label="Finding the best deals for you..." />}

      {status === 'error' && (
        <ErrorState message={errorMessage} onRetry={() => load(debouncedQuery)} />
      )}

      {status === 'success' && products.length === 0 && (
        <EmptyState message={`No products found for "${debouncedQuery}"`} />
      )}

      {status === 'success' && products.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          )}
        />
      )}
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
