import fs from 'node:fs';
import path from 'node:path';

function mdToHtml(md: string){
  // tiny converter: headers & paragraphs only
  return md
    .replace(/^# (.*)$/gm, '<h1 class="h2 mb-2">$1</h1>')
    .replace(/^## (.*)$/gm, '<h2 class="text-xl font-semibold mb-2">$1</h2>')
    .replace(/^\- (.*)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/,'<p>') + '</p>';
}

export default async function Page({ params }: { params: { slug: string }}){
  const file = path.join(process.cwd(), 'app', 'legal', params.slug, 'page.md');
  const md = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '# Not found';
  const html = mdToHtml(md);
  return (
    <main className="container py-12">
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{__html: html}} />
    </main>
  );
}
