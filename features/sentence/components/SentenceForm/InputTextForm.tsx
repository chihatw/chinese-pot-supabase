import { Input } from '@/components/ui/input';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const InputTextForm = ({ text }: { text: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const form = useRef<HTMLFormElement>(null);

  /**
   * 初期値設定
   */
  useEffect(() => {
    if (!form.current) return;
    const inputForm = form.current.elements[0] as HTMLInputElement;
    inputForm.value = text;
  }, [text]);

  /**
   * input を url に反映させる
   */
  const handleChangeText = () => {
    // get raw
    if (!form.current) return;
    const formdata = new FormData(form.current);
    const raw = formdata.get('text')!;

    // remove kana, alphabet
    // 半角スペースも削除
    const trimed = raw
      ?.toString()
      .trim()
      .replace(/[a-zA-Z\u3041-\u3096\u30A1-\u30FA]/gi, '')
      .replaceAll(' ', '');

    // 現在の url の searchParams.text '?text=...' と trimed が同じなら何もしない
    if (trimed === text) return;

    // 違う場合、searchParams を変更する
    const url = pathname + (trimed ? `?text=${trimed}` : '');
    router.push(url);
  };

  return (
    <form ref={form}>
      <Input className='bg-white' onChange={handleChangeText} name='text' />
    </form>
  );
};

export default InputTextForm;
