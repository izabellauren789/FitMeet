const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');  // Corrected the property name

module.exports = defaultConfig;

