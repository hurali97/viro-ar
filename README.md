# viro-ar
This repo contains POC on viro AR ( Viro Community )

### Installation for viro react package
https://github.com/ViroCommunity/viro/blob/main/readmes/INSTALL_ANDROID.md

### Code samples
https://github.com/viromedia/viro/tree/master/code-samples/js

### Viro Docs
https://viro-community.readme.io/docs

### Helpful links
https://blog.viromedia.com/https-blog-viromedia-com-asset-pipeline-animating-3d-characters-for-ar-vr-arkit-arcore-c7aff566bcf8

### Troubleshooting
- If you see any error related to file not found, a potential reason could be you didn't setup asset resolver in metroconfig.js, like so:
```sh
const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { assetExts }
  } = await getDefaultConfig();

  return {
    transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    },
    resolver: {
      assetExts: [
        ...assetExts,
        'obj',
        'mtl',
        'JPG',
        'vrx',
        'hdr',
        'gltf',
        'glb',
        'bin',
        'arobject',
        'gif',
      ],
    },
  };
})();
```
- If you see error related to expoplayer:2.7.1 not found, duplicate source, a solution might be to comment out the exoplayer dependency.
