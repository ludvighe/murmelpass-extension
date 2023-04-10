echo "BUILDING APP"
cd solid/murmelpass/
npm run build
cp -r dist/* ../../extension/
cd ../../

echo -e "\nZIPPING EXTENSION"
zip -r extension.zip extension
