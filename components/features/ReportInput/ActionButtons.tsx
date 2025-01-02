import { Button } from "@/components/ui/button";
import { Save, Sparkles } from "lucide-react";

type ActionButtonsProps = {
  onSave: (value: string) => void;
  onGetAdvice: (value: string) => void;
  value: string;
  isLoading: boolean;
  disabled?: boolean;
};

const ActionButtons = ({
  onSave,
  onGetAdvice,
  isLoading,
  value,
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-col pt-2 pb-4 sm:flex-row justify-center gap-4">
      <Button
        variant="secondary"
        onClick={() => onSave(value)}
        className="w-60"
      >
        <Save className="h-4 w-4 mr-2" />
        保存する
      </Button>
      <Button
        onClick={() => onGetAdvice(value)}
        className="w-60"
        disabled={isLoading}
      >
        <Sparkles className="h-4 w-4 mr-2" />
        アドバイスをもらう
      </Button>
    </div>
  );
};

export default ActionButtons;
