# Restore
Check dashboard > Settings > Database > Connection string
```shell
pg_restore \
  -h aws-0-ap-northeast-1.pooler.supabase.com \
  -p 6543 \
  -d postgres \
  -U postgres.pozqdtbsteqdrbyfvzoh \
  < ~/Desktop/backup.dump

# password ******
```