// 'use client';

// import addToast from '@/components/toast/useToast';

// export async function activateBot(botId: string): Promise<boolean> {
//   try {
//     const res = await fetch('/api/bots/activate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ botId }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       addToast(data.error || 'Could not activate bot', 'error');
//       return false;
//     }

//     addToast('Bot activated successfully', 'success');
//     return true;
//   } catch (err) {
//     console.error(err);
//     addToast('Something went wrong', 'error');
//     return false;
//   }
// }
