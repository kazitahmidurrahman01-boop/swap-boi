import EBookReaderClient from './EBookReaderClient';
import { MOCK_EBOOKS } from '@/lib/mock-data';

export function generateStaticParams() {
  return MOCK_EBOOKS.map((eb) => ({
    id: eb.id,
  }));
}

export default function EBookReaderPage() {
  return <EBookReaderClient />;
}
