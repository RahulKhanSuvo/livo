'use client';
import { useEffect, useState } from 'react';
import { saleBannerData } from './SaleBanner';
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const SaleTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 36,
    hours: 22,
    minutes: 22,
    seconds: 47,
  });

  // Working Countdown Logic
  useEffect(() => {
    const target = new Date(saleBannerData.targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Helper to format numbers with leading zero
  const formatTime = (num: number) => String(num).padStart(2, '0');
  return (
    <>
      <div className="pt-12 lg:pt-0 w-full">
        <div className="flex items-center space-x-3 sm:space-x-4 text-2xl sm:text-3xl font-light tracking-wider font-mono">
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.days)}</span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-sans mt-1">
              Days
            </span>
          </div>
          <span className="text-neutral-400 font-sans -mt-3">:</span>

          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.hours)}</span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-sans mt-1">
              Hours
            </span>
          </div>
          <span className="text-neutral-400 font-sans -mt-3">:</span>

          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.minutes)}</span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-sans mt-1">
              Min
            </span>
          </div>
          <span className="text-neutral-400 font-sans -mt-3">:</span>

          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.seconds)}</span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-sans mt-1">
              Sec
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default SaleTimer;
