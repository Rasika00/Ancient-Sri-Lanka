import { FormEvent } from "react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AuthTab = "login" | "register";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
  onAuthenticated?: (tab: AuthTab) => void;
}

const AuthDialog = ({ open, onOpenChange, activeTab, onTabChange, onAuthenticated }: AuthDialogProps) => {
  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    toast.success("Login successful", {
      description: `Welcome back, ${email}.`,
    });
    onAuthenticated?.("login");
    onOpenChange(false);
    event.currentTarget.reset();
  };

  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Re-enter the password confirmation and try again.",
      });
      return;
    }

    toast.success("Registration successful", {
      description: `Account created for ${fullName || email}.`,
    });
    onAuthenticated?.("register");
    onOpenChange(false);
    event.currentTarget.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-primary/20 bg-card/95 text-foreground backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-gold-gradient tracking-wide">
            Enter the Archive
          </DialogTitle>
          <DialogDescription className="text-foreground/75">
            Sign in to continue your journey or create a new account to save discoveries.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as AuthTab)} className="mt-2">
          <TabsList className="grid w-full grid-cols-2 bg-background/70 text-foreground/70">
            <TabsTrigger value="login" className="font-display tracking-wide data-[state=active]:text-primary">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="font-display tracking-wide data-[state=active]:text-primary">
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-5">
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-foreground/90">Email</Label>
                <Input id="login-email" name="email" type="email" placeholder="name@example.com" required className="border-primary/20 bg-background/70 text-foreground placeholder:text-foreground/45" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-foreground/90">Password</Label>
                <Input id="login-password" name="password" type="password" placeholder="Enter your password" required className="border-primary/20 bg-background/70 text-foreground placeholder:text-foreground/45" />
              </div>
              <Button type="submit" className="w-full font-display tracking-wide shadow-gold">
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-5">
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-foreground/90">Full Name</Label>
                <Input id="register-name" name="fullName" type="text" placeholder="Your full name" required className="border-primary/20 bg-background/70 text-foreground placeholder:text-foreground/45" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-foreground/90">Email</Label>
                <Input id="register-email" name="email" type="email" placeholder="name@example.com" required className="border-primary/20 bg-background/70 text-foreground placeholder:text-foreground/45" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-foreground/90">Password</Label>
                  <Input id="register-password" name="password" type="password" placeholder="Create password" required minLength={6} className="border-primary/20 bg-background/70 text-foreground placeholder:text-foreground/45" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password" className="text-foreground/90">Confirm</Label>
                  <Input id="register-confirm-password" name="confirmPassword" type="password" placeholder="Repeat password" required minLength={6} className="border-primary/20 bg-background/70 text-foreground placeholder:text-foreground/45" />
                </div>
              </div>
              <Button type="submit" className="w-full font-display tracking-wide shadow-gold">
                Register
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;