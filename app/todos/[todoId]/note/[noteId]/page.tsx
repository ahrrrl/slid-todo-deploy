import { cookies } from 'next/headers';
import NoteForm from '../../create/_view/NoteForm';

export default async function Page({ params }: { params: { noteId: string } }) {
  const { noteId } = params;
  const accessToken = cookies().get('accessToken');

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${accessToken?.value}` },
    cache: 'no-store',
  });
  const body = await response.json();
  const { title, content, linkUrl } = body;

  return (
    <main className='flex w-full'>
      <section className='w-10 h-screen'></section> {/* 링크 임베드 */}
      <section className='max-w-[800px] w-full py-6 px-10 flex flex-col'>
        <NoteForm title={title} content={content} linkUrl={linkUrl} method='PATCH' noteId={noteId} />
      </section>
    </main>
  );
}
