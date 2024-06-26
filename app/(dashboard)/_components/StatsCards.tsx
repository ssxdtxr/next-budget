"use client";

import { GetBalancedStatsResponseType } from "@/app/api/stats/balance/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card } from "@/components/ui/card";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/heplers";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { FC, ReactNode, useCallback, useMemo } from "react";
import CountUp from "react-countup";

interface IStatsCards {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

export const StatsCards: FC<IStatsCards> = ({ from, to, userSettings }) => {
  const statsQuery = useQuery<GetBalancedStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const income = statsQuery.data?.income || 0;
  const expense = statsQuery.data?.expense || 0;

  const balance = income - expense;

  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={income}
          title="Income"
          icon={
            <TrendingUp
              className="h-12 w-12 items-center rounded-lg 
            p-2 text-emerald-500 bg-emerald-400/10"
            />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={expense}
          title="Expense"
          icon={
            <TrendingDown
              className="h-12 w-12 items-center rounded-lg 
            p-2 text-red-500 bg-red-400/10"
            />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={balance}
          title="Balance"
          icon={
            <Wallet
              className="h-12 w-12 items-center rounded-lg 
            p-2 text-violet-500 bg-violet-400/10"
            />
          }
        />
      </SkeletonWrapper>
    </div>
  );
};
type StatCardType = {
  formatter: Intl.NumberFormat;
  icon: ReactNode;
  title: string;
  value: number;
};
const StatCard = ({ formatter, icon, title, value }: StatCardType) => {
  const formatFn = useCallback(() => {
    return formatter.format(value);
  }, [formatter]);

  return (
    <Card className="flex h-24 w-full items-start gap-2 p-4">
      {icon}
      <div className="flex flex-col items-center gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          duration={0.5}
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          formattingFn={formatFn}
          className="text-2xl"
        />
      </div>
    </Card>
  );
};
