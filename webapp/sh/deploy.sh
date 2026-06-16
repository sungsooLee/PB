#/bin/sh

echo "delete old Resource!!!"

cd /app/wpbwapp/bak/

rm -rf components
rm -rf resources

echo "backup AS-IS resources!!!!"

cd /app/wpbwapp/

mv components /app/wpbwapp/bak/
mv resources /app/wpbwapp/bak/


cd /app/woori-pb/

echo "move directory to Web Path!"

cp -R components /app/wpbwapp/
cp -R resources /app/wpbwapp/

chmod -R 775 /app/wpbwapp/

echo "finish move resources!!!!"

echo "success"

exit 0