import BookDetailsClient from './BookDetailsClient';
import { MOCK_BOOKS } from '@/lib/mock-data';

export function generateStaticParams() {
  return MOCK_BOOKS.map((b) => ({
    id: b.id,
  }));
}

export default function BookDetailsPage() {
  return <BookDetailsClient />;
}
