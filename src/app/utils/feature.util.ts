import { FeatureType } from '../typings/feature.typing';

export function isFeatureOff(
  features: Record<FeatureType, boolean>, featureName: FeatureType): boolean {
  // Read the value from the config service
  if (features.hasOwnProperty(featureName)) {
    return !features[featureName];
  }
  return true; // if feature not found, default to turned off
}

export function isFeatureOn(
  features: Record<FeatureType, boolean>, featureName: FeatureType): boolean {
  return !isFeatureOff(features, featureName);
}
