# Restore
Check dashboard > Settings > Database > Connection string
```shell
psql \
-h aws-0-ap-northeast-1.pooler.supabase.com \
-p 6543 \
-d postgres \
-U postgres.fclyvkyxokodkqipxorr \
-f backup.dump
# Password for user postgres.fclyvkyxokodkqipxorr:
```

# Memo
- `tsconfig.json`
  - `new Set()` を使うために `"target": "es6"` 追記

- `next.config.mjs`
  - cache 状態を見るため
```js
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```