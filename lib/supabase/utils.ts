export const fetchSupabase = ({
  query = '',
  cache = 'force-cache' as RequestCache | undefined,
}) => {
  return fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/' + query, {
    headers: {
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
    cache,
  });
};
