SOLID_ROOT="solid/murmelpass"
SOLID_DIST="$SOLID_ROOT/dist/"
SOLID_NODE_MODULES="$SOLID_ROOT/node_modules/"

EXTENSION_ROOT="extension"
EXTENSION_ASSETS="$EXTENSION_ROOT/assets/"
EXTENSION_INDEX="$EXTENSION_ROOT/index.html"

echo "Clearing solid folders"
rm -r $SOLID_DIST

echo "Clearing extension folders"
rm -r $EXTENSION_ASSETS
rm $EXTENSION_INDEX
rm "extension.zip"