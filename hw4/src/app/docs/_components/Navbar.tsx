// function Navbar() {
import { AiFillFileAdd } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

async function Navbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }

    return (
    //   <div className="w-full">
    //     <nav className="sticky top-0 w-full border bg-slate-100 p-3">Navbar</nav>
    //     <section>
    //       {Array.from({ length: 100 }, (_, i) => (
    <nav className="flex w-full flex-col overflow-y-scroll bg-slate-100 pb-10">
      <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-slate-100 pb-2">
        <div className="flex w-full items-center justify-between px-3 py-1">
          <div className="flex items-center gap-2">
            <RxAvatar />
            <h1 className="text-sm font-semibold">
              {session?.user?.username ?? "User"}
            </h1>
            {/* <div key={i} className="w-full border">
              Content {i} */}
            </div>
            <Link href={`/auth/signout`}>
            <Button
              variant={"ghost"}
              type={"submit"}
              className="hover:bg-slate-200"
            >
              Sign Out
            </Button>
          </Link>
      </div>
      <form className="w-full hover:bg-slate-200">
          <button
            type="submit"
            className="flex w-full items-center gap-2 px-3 py-1 text-left text-sm text-slate-500"
          >
            <AiFillFileAdd size={16} />
            <p>Create Document</p>
          </button>
        </form>
      </nav>
    </nav>
    );
  }
  
  export default Navbar;
  