import { Dog } from "lucide-react";

interface LoginHeaderProps {
  title?: string;
}

export default function LoginHeader({
  title = "Fetch a Friend",
}: LoginHeaderProps) {
  return (
    <div className="justify-center flex flex-row items-center">
      <div className="mr-2 w-6 h-6 bg-primary rounded-md flex items-center justify-center">
        <Dog className="w-4 h-4 text-primary-foreground" />
      </div>
      <h1 className="text-xl font-semibold tracking-tight text-primary">
        {title}
      </h1>
    </div>
  );
}
