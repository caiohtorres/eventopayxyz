import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = async () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Gerenciador de Eventos
          </h1>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-xl">Seja bem-vindo</p>
        </div>
        <Link href="/eventos">
          <Button className="mt-4">Entrar no gerenciador</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
