import { Editor } from '@/components/editor';

export default function Home() {
  return (
    <div className="size-full flex-1 vertical">
      <header className="w-full py-4 horizontal center">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary">typofy</h1>
      </header>

      <Editor />
    </div>
  );
}
