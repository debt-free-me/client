import _ from 'lodash';
import { FeatureType } from '../typings/feature.typing';
import { ConfigState } from '../typings/state.typing';

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

export function areFeaturesValid(
  features: Record<FeatureType, boolean>
): boolean {
  // @TODO add more rules
  return !_.isNil(features);
}

export function isConfigValid(config: ConfigState): boolean {
  // @TODO add more rules
  return !_.isNil(config) && areFeaturesValid(config.features);
}
