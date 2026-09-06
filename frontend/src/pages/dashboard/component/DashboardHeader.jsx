import { Button } from '../../../component/Button';

export const DashboardHeader = () => {
  return (
    <header className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 w-full pb-4 border-b border-b-border">
      <div>
        <h2 className="font-sans font-semibold text-base leading-6 text-text">
          Overview
        </h2>
        <p className="text-text-h text-sm regular leading-5">
          Manage scheduling constraints and monitor system health
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          text={"NLP Adjustments"}
          className="text-text bg-bg border border-border"
        />
        <Button
          text={"Export Master PDF"}
          className="text-text bg-bg border border-border"
        />
        <Button text={"Generate Schedule (Greedy)"} />
      </div>
    </header>
  );
};
