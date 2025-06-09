interface LoginFooterProps {
  message?: string;
}

export default function LoginFooter({ 
  message = "Ready to find your new best friend? 🐾"
}: LoginFooterProps) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {message}
    </p>
  );
}