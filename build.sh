#!/bin/bash

echo "🛠 Vite 프로젝트 빌드 시작"

rm -rf output
mkdir output

yarn install --frozen-lockfile
yarn build

cp -r dist/. output/
cp vercel.json output/

echo "✅ 빌드 완료 - output 폴더 생성됨"
