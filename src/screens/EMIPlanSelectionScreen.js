import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import EMIPlanCard, { NoCostBadge } from '../components/EMIPlanCard';
import { LoadingState, ErrorState } from '../components/AsyncStates';
import { fetchEmiPlans, submitOrderIntent } from '../api/marketplaceApi';
import { colors, radii, spacing, typography, shadow } from '../theme';
import { formatCurrency } from '../utils/format';

export default function EMIPlanSelectionScreen({ route, navigation }) {
  const { productId, variantId, productName, variantLabel, price, maxTenureMonths } =
    route.params;

  const [status, setStatus] = useState('loading');
  const [plans, setPlans] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const data = await fetchEmiPlans(price, maxTenureMonths);
      setPlans(data);
      setSelectedPlanId(data[0]?.id ?? null);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }, [price, maxTenureMonths]);

  useEffect(() => {
    load();
  }, [load]);

  const handleProceed = async () => {
    if (!selectedPlanId) return;
    setSubmitting(true);
    try {
      await submitOrderIntent({ productId, variantId, emiPlanId: selectedPlanId });
      Alert.alert(
        'Plan selected \u2705',
        'Next, you would check your eligibility and pledge mutual funds to complete this purchase. (Out of scope for this assignment.)',
        [{ text: 'Back to Marketplace', onPress: () => navigation.popToTop() }]
      );
    } catch (err) {
      Alert.alert('Could not proceed', err.message || 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Feather name="arrow-left" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose EMI Plan</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryProduct} numberOfLines={1}>
            {productName}
          </Text>
          <Text style={styles.summaryVariant}>{variantLabel}</Text>
          <Text style={styles.summaryPrice}>{formatCurrency(price)}</Text>
        </View>

        <NoCostBadge />

        {status === 'loading' && <LoadingState label="Fetching EMI plans..." />}
        {status === 'error' && <ErrorState message={errorMessage} onRetry={load} />}

        {status === 'success' &&
          plans.map((plan) => (
            <EMIPlanCard
              key={plan.id}
              plan={plan}
              isSelected={plan.id === selectedPlanId}
              onSelect={setSelectedPlanId}
            />
          ))}
      </ScrollView>

      <View style={styles.ctaBar}>
        <TouchableOpacity
          style={[styles.ctaButton, (!selectedPlanId || submitting) && styles.ctaButtonDisabled]}
          activeOpacity={0.85}
          disabled={!selectedPlanId || submitting}
          onPress={handleProceed}
        >
          <Text style={styles.ctaButtonText}>
            {submitting ? 'Processing...' : 'Proceed with this plan'}
          </Text>
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
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  summaryProduct: {
    ...typography.bodyBold,
  },
  summaryVariant: {
    ...typography.caption,
    marginTop: 2,
  },
  summaryPrice: {
    ...typography.h3,
    marginTop: spacing.sm,
  },
  ctaBar: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadow.card,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  ctaButtonDisabled: {
    opacity: 0.5,
  },
  ctaButtonText: {
    ...typography.bodyBold,
    color: colors.textOnPrimary,
  },
});
