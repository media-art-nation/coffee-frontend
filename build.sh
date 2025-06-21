#!/bin/bash

echo "🔧 Build 시작"

# 1. 이전 결과 제거
rm -rf output
mkdir output

# 2. 의존성 설치
yarn install --frozen-lockfile

# 3. 프로젝트 빌드
yarn build

# 4. 결과물 복사 (예: Vite/Cra 기준)
cp -r dist/* output/

echo "✅ Build 완료, output 디렉토리 생성됨"