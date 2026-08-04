import { Container } from '@/components/shared/Container';
import { initials, type ProfileUser } from '../profile.data';

export function ProfileWelcome({ user }: { user: ProfileUser }) {
  const first = user.name.split(' ')[0];

  return (
    <section className="relative overflow-hidden border-b border-[#161512]/10">
      <div aria-hidden className="bg-grain absolute inset-0 opacity-60" />
      <Container className="relative py-14 sm:py-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-5">
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.4em] text-[#4b6b56] uppercase">
              <span className="inline-block size-1.5 rounded-full bg-[#d98e63]" />
              Livo Studio — Member area
            </p>

            <h1 className="font-serif text-5xl tracking-tight text-[#161512] sm:text-6xl">
              Welcome, {first}
              <span className="text-[#d98e63]">.</span>
            </h1>

            <p className="max-w-md text-sm leading-relaxed text-[#4c4a45]/70">
              A considered home is never finished. Follow your orders and keep your details in
              order.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-full bg-[#161512] font-serif text-xl text-[#f4f1e8]">
              {initials(user.name)}
            </div>
            <div className="space-y-0.5">
              <p className="font-medium text-[#161512]">{user.name}</p>
              <p className="text-sm text-[#4c4a45]/55">{user.email}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
