// metro.config.js (en la raíz)
const { getDefaultConfig } = require('@react-native/metro-config');
const { withNativeWind }    = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Incluimos .css en los assets
config.resolver.assetExts = [...config.resolver.assetExts, 'css'];

module.exports = withNativeWind(config, {
  input: './global.css',
});
