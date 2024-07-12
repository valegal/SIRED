echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* siredapp@200.16.118.194:/var/www/200.16.118.194/

echo "Done!"