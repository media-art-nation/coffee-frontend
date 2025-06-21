#!/bin/bash

echo "🛠 Vite 프로젝트 빌드 시작"

# 1. output 폴더 초기화
rm -rf output
mkdir output

# 2. 의존성 설치
yarn install --frozen-lockfile

# 3. 빌드 실행
yarn build

# 4. 빌드 결과 전체 복사
cp -r dist/. output/

echo "✅ 빌드 완료 - output 폴더 생성됨"
