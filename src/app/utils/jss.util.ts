import jss, { StyleSheet, RuleOptions, Styles } from 'jss';

export function createStyleSheet(
  styles: Partial<Styles<any>>, options: Partial<RuleOptions> = {}
): StyleSheet {
  return jss.createStyleSheet(styles, {
    link: true,
    ...options,
  }).attach();
}
