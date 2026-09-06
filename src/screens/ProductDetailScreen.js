import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import VariantSelector from '../components/VariantSelector';
import { LoadingState, ErrorState } from '../components/AsyncStates';
import { fetchProductDetail } from '../api/marketplaceApi';
import { colors, radii, spacing, typography, shadow } from '../theme';
import { formatCurrency } from '../utils/format';

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;

  const [status, setStatus] = useState('loading');
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const data = await fetchProductDetail(productId);
      setProduct(data);
      setSelectedVariantId(data.variants[0]?.id ?? null);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  if (status === 'loading') {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingState label="Loading product..." />
      </SafeAreaView>
    );
  }

  if (status === 'error') {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState message={errorMessage} onRetry={load} />
      </SafeAreaView>
    );
  }

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Feather name="arrow-left" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {product.name}
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: product.heroImage }} style={styles.image} resizeMode="contain" />

        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.ratingRow}>
          <Feather name="star" size={14} color="#F59E0B" />
          <Text style={styles.ratingText}>
            {product.rating} ({product.ratingCount.toLocaleString('en-IN')} ratings)
          </Text>
        </View>

        <Text style={styles.price}>{formatCurrency(selectedVariant.price)}</Text>

        <View style={styles.emiTag}>
          <Text style={styles.emiTagText}>
            No-cost EMI upto {product.maxEmiTenureMonths} months \u00b7 0% interest
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Select variant</Text>
        <VariantSelector
          variants={product.variants}
          selectedId={selectedVariantId}
          onSelect={setSelectedVariantId}
        />

        <Text style={styles.sectionLabel}>About this product</Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>

      <View style={styles.ctaBar}>
        <View>
          <Text style={styles.ctaPriceLabel}>Selected price</Text>
          <Text style={styles.ctaPrice}>{formatCurrency(selectedVariant.price)}</Text>
        </View>
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('EMIPlanSelection', {
              productId: product.id,
              variantId: selectedVariant.id,
              productName: product.name,
              variantLabel: selectedVariant.label,
              price: selectedVariant.price,
              maxTenureMonths: product.maxEmiTenureMonths,
            })
          }
        >
          <Text style={styles.ctaButtonText}>View EMI Plans</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    ...typography.bodyBold,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.md,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  image: {
    width: '100%',
    height: 240,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
  },
  brand: {
    ...typography.tiny,
    textTransform: 'uppercase',
    marginTop: spacing.lg,
  },
  name: {
    ...typography.h1,
    fontSize: 22,
    marginTop: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  ratingText: {
    ...typography.caption,
  },
  price: {
    ...typography.h1,
    fontSize: 24,
    marginTop: spacing.lg,
  },
  emiTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    marginTop: spacing.sm,
  },
  emiTagText: {
    ...typography.tiny,
    color: colors.primary,
    fontWeight: '600',
  },
  sectionLabel: {
    ...typography.h3,
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  ctaBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadow.card,
  },
  ctaPriceLabel: {
    ...typography.tiny,
  },
  ctaPrice: {
    ...typography.h3,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
  },
  ctaButtonText: {
    ...typography.bodyBold,
    color: colors.textOnPrimary,
  },
});
