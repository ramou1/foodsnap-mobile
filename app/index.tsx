// app/index.tsx
import { Redirect } from 'expo-router';
import '../app/globals.css';

export default function Index() {
  return <Redirect href="/login" />;
}
